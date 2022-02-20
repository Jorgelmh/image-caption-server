import requests
import json
import pattern.en

"""
  =====================================
      RULES FOR GENERATING CAPTIONS
  =====================================

  Logic for creating captions from the image features
  detected by the model.
"""

def process_edges (edges, attr, node, minimum_weight, start_node):
  links = list()

  # Populate locations if it achieves the threshold
  for link in edges:
    if link['weight'] >= minimum_weight and link['rel']['@id'] == attr:
      formatted_edge = { 'label': link[node]['label'], 'node': start_node, 'start': link['start']['label'], 'weight': link['weight'] }

      # If link has a NLP sample text then add it to the processed edge
      if link['surfaceText']:
        formatted_edge['surface_text'] = link['surfaceText']

      links.append(formatted_edge)
      
  return links

def get_edges_between_objects (obj1, obj2, attr, node, minimum_weight):
  request_url = f'https://api.conceptnet.io/query?start=/c/en/{obj1}&rel={attr}&end=/c/en/{obj2}'
  edges = requests.get(request_url).json()['edges']
  processed_edges = process_edges(edges, attr, node, minimum_weight, obj1)

  return processed_edges

def build_links_dict (img_objects, min_weight):
  
  # Data will be represented by an array of objects
  array_objects = list()

  # Populate array of dictionaries
  for entity in img_objects:

    # Start from a dictionary with the name of the object
    img_dict = { 'name': entity, 'HasA': [], 'UsedFor': [] }

    # First get the location of the object (Object-specific data)
    request_url = f'https://api.conceptnet.io/query?start=/c/en/{entity}&rel=/r/AtLocation'
    edges = requests.get(request_url).json()['edges']
    
    location_edges = process_edges(edges, '/r/AtLocation', 'end', min_weight, entity)
    img_dict['location'] = location_edges
    
    # Populate relations with the other objects
    other_features = set(img_objects) - set([entity])

    for img_obj in other_features:
      # Check if there's 'HasA' relations between the two objects
      hasA_edges = get_edges_between_objects(img_obj, entity, '/r/AtLocation', 'start', min_weight)
      if hasA_edges:
        img_dict['HasA'].append(hasA_edges[0])

      # Check if there's 'UsedFor' relations between the two objects
      usedFor_edges = get_edges_between_objects(entity, img_obj, '/r/UsedFor', 'end', min_weight)
      img_dict['UsedFor'] = usedFor_edges

    array_objects.append(img_dict)
  
  return array_objects

def join_words(words):
  reformated_words = [obj.replace("_", " ") for obj in words]
  if len(reformated_words) > 2:
    return '%s, and %s' % ( ', '.join(reformated_words[:-1]), reformated_words[-1] )
  else:
    return ' and '.join(reformated_words)

def get_location_inference(links_dict, location_certainty) :
  # Keep a record of how often each location appears in the list of concept
  location_count = {}
  concepts = list()
  objects_with_location = 0

  # Loop through the array of concepts
  for concept in links_dict:

    has_permitted_loc = False
                                                                                                                                                                                                                                                                                                                                            
    for location in concept['location']:
      # It needs to be a proper location not other object from the image
      is_other_object = next((x for x in links_dict if x['name'] == location['label'].replace('a ', '')), None)
      if is_other_object:
        continue

      has_permitted_loc = True
      if location['label'] not in location_count:
        location_count[location['label']] = 1
      else :
        location_count[location['label']] += 1
    
    if has_permitted_loc:
      objects_with_location += 1
  
  # Most popular location from dictionary
  mp_location = max(location_count, key=location_count.get)

  # If no object has a location relationship then nothing can be infered
  if objects_with_location == 0:
    return False

  # Calculate percentage of objects which may be located in the most popular location
  location_percentage = location_count[mp_location] / objects_with_location

  if location_percentage >= location_certainty:
    return mp_location
  
  return False

def get_nlp_preposition (location, links_dict):
  surfaceText = ''
  start = ''
  # Find NLP surface text for this location
  for concept in links_dict:
    for locationLink in concept['location']:
      if locationLink['label'] == location and 'surface_text' in locationLink:
        start = locationLink['start']
        surfaceText = locationLink['surface_text']
        break

  if 'Something' in surfaceText:
    return surfaceText.split(' ')[3]
  
  if 'likely' in surfaceText:
    words_location = len(start.split(' '))
    return surfaceText.split(' ')[5 + words_location]

  if 'Somewhere' in surfaceText:
    words_location = len(start.split(' '))
    return surfaceText.split(' ')[4 + words_location]

  return 'at'

def generate_sentence_from_dict (links_dict, pluralized_words, location_certainty):
  # Sentence will be generated Hierarchically based on the nature of the dictionary
  """
    1. Based on the 'HasA' relationship. The concept with more will be used.
    2. If none of the objects has that relationship the second option will be
      the 'UsedFor' where the one with the highest weight will be selected.
    3. If none of the objects has any relationhip between each other then
      they'll be listed separated by commas.
    4. Finally, independently of the existence of any relationship, the location
      will be infered. If the most recurrent location amongst concepts is equal
      or greater than the location_certainty, then it will be inferred that all
      these concepts are in that location. The critaria will be based on the 
      percentage of objects that are in that location. 
  """
  image_caption = ''
  hasA_concept = links_dict[0]
  usedFor_rel = False

  # Loop through concepts to choose the one with more 'HasA' relationships.
  for concept in links_dict:
    if len(concept['HasA']) > len(hasA_concept['HasA']):
      hasA_concept = concept
      hasA_concept['concept'] = concept['name']

    for node in concept['UsedFor']:
      if not usedFor_rel or node['weight'] > usedFor_rel['weight']:
        # Add starting point
        node['start'] = concept['name']
        usedFor_rel = node

  # Inference the location of the future captions based on the objects' knowledge
  possible_location = get_location_inference(links_dict, location_certainty)

  # If there are more concepts integrated in this relationship then create caption.
  if len(hasA_concept['HasA']) > 0 :
    words_array = [rel['label'] for rel in hasA_concept['HasA']]
    words_already_present = [rel['node'] for rel in hasA_concept['HasA']]
    words_already_present.append(hasA_concept['name'])
    other_words = set(pluralized_words) - set(words_already_present)
    image_caption = f"A {hasA_concept['name']} with {join_words(words_array)}"

    if len(other_words) > 0:
      image_caption += f", {join_words(other_words)}"

  # If no caption was generated from the "HasA" relationship then try with "UsedFor"
  if image_caption == '' and usedFor_rel:
    image_caption = f"A {usedFor_rel['start']} that may be used for {usedFor_rel['label']}"

  if image_caption == '' :
    image_caption = f"A {join_words(pluralized_words)}"

  # If a location has been infered then add it to the caption
  if possible_location:
    location_preposition = get_nlp_preposition(possible_location, links_dict)
    image_caption += f", perhaps {location_preposition} {possible_location}"
    
  return image_caption

"""
 Since the Object Detection model may return the same concept twice, repeated
 objects will be replaced with their plural form.

 Note: Conceptnet has links to plural forms as well.
"""
def pluralize_list (concepts):
  end_list = list()
  all_words = list()

  for obj in concepts:
    # If plural form is already in array then skip
    if pattern.en.pluralize(obj) in end_list:
      continue

    # If already present in the array then replace with plural form
    if obj in end_list:
      index = end_list.index(obj)
      end_list[index] = pattern.en.pluralize(obj)
      all_words.append(pattern.en.pluralize(obj))
    
    else :
      end_list.append(obj)
      all_words.append(obj)

  return end_list, all_words

def generate_caption_from_concept (img_features, location_certainty = .4, min_weight = 1):
  # Conceptnet doesn't recognize spaces, therefore they have to be replaced by underscores
  formatted_objects = [obj.replace(" ", "_") for obj in img_features]

  # Pluralize repeated objects in the image
  pluralized_objects, all_words = pluralize_list(formatted_objects)

  # Generate a data structure that stores the objects and their relationships
  concept_dict = build_links_dict(all_words, min_weight)

  # Create an NLP sentence that describes the relationship between the elements
  caption = generate_sentence_from_dict(concept_dict, pluralized_objects, location_certainty)

  return caption
