import { Row, Col, Modal } from 'react-bootstrap'
import EventCard from '../EventCard/EventCard'
import { useState, useEffect } from 'react'
import EventForm from '../EventForm/EventForm'
import eventService from '../../../services/event.services'
import Loader from '../../Loader/Loader'
import SearchBar from '../../SearchBar/SearchBar'


const EventList = () => {

    const [events, setEvents] = useState([])
    const [showModal, setShowModal] = useState(false)


    const filteredEvents = e => {

        eventService
            .filterEvents(e.target.value)
            .then(({ data }) => {
                setEvents(data)
            })
            .catch(err => console.log(err))

    }

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {
        eventService
            .getEvents()
            .then(({ data }) => {
                setEvents(data)
            })
            .catch(err => console.log(err))
    }

    return (

        <>
            {
                events.length ?
                    <Row>

                        <h1>List of events <span onClick={openModal}>+</span></h1>
                        <hr></hr>
                        <SearchBar filterEvents={filteredEvents} />
                        {
                            events.map(event => {
                                return (
                                    <Col md={3} key={event._id}>
                                        <Col  >
                                            <EventCard {...event} />
                                        </Col>
                                    </Col>
                                )

                            })
                        }

                        <Modal show={showModal} onHide={closeModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Event</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EventForm closeModal={closeModal} loadEvents={loadEvents} />
                            </Modal.Body>
                        </Modal>

                    </Row>
                    :
                    < Loader />
            }
        </>
    )

}

export default EventList