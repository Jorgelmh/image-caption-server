import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AppContainer } from '../AppContainer'
import { Container, Row, Col } from 'react-bootstrap'
import PredictionCard from './PredictionCard'
import loader from '../loader.gif'
import { usePopup } from './usePopup'
import Header from './Header'

/**
 *  ===========================
 *      Show All Predictions
 *  ===========================
 */

const Dataset = () => {
  const [dataset, setDataset] = useState([])
  const [loading, setLoading] = useState(true)
  const { displayPopup } = usePopup()

  const getRows = (arr) => arr.reduce((acc, curr, i) => {
    if (!(i % 3)) { // if index is 0 or can be divided by the `size`...
      acc.push(arr.slice(i, i + 3)) // ..push a chunk of the original array to the accumulator
    }
    return acc
  }, [])

  const handleImage = (record) => {
    displayPopup(record)
  }

  const fetchFromDb = (offset) => axios.get('/api/captions', { params: { offset, limit: 30 } }).then((response) => {
    console.log(response.data.length)
    return Promise.resolve(response.data)
  })

  useEffect(() => {
    
    let datasetLocal = []
    let offset = 1

    fetchFromDb(offset).then((data) => {
      const dividedArr = getRows(data)
      datasetLocal = dividedArr
      offset += 30
      setDataset(dividedArr)
    })

    let fetching = false

    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY + 100) >= document.body.offsetHeight) {
        if (!fetching) {
          fetchFromDb(offset).then((data) => {
            offset += 30
            if (data.length === 0) {
              setLoading(false)
              return
            }
            console.log(datasetLocal)
            const dividedArr = getRows(data)
            datasetLocal = [...datasetLocal, ...dividedArr]
            setDataset([...datasetLocal])
            fetching = false
          })
          fetching = true
        }
      }
    }

    return () => {
      window.onscroll = null
    }
  }, [])

  return (
    <>
      <Header />
      <AppContainer>
        <h1 style={{ margin: '20px 0' }}> Full Dataset of Predictions: </h1>
        <Container>
          {
            dataset.map(([recordA, recordB, recordC]) => (
              <Row style={{ margin: '20px 0' }} key={recordA.id}>
                <Col md='4'>
                  <PredictionCard handleClick={() => handleImage(recordA)} {...recordA}/>
                </Col>
                {
                  recordB && (
                    <Col md='4'>
                      <PredictionCard handleClick={() => handleImage(recordB)} {...recordB}/>
                    </Col>
                  )
                }
                {
                  recordC && (
                    <Col md='4'>
                      <PredictionCard handleClick={() => handleImage(recordC)} {...recordC}/>
                    </Col>
                  )
                }
              </Row>
            ))
          }
        </Container>
        <div className="disp-flex" style={{ justifyContent: 'center' }}>
          {
            loading && (
              <img style={{ maxWidth: '100px' }} src={loader} />
            )
          }
        </div>
      </AppContainer>
    </>
  )
}

export default Dataset
