import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const EventCard = ({ origin, destination, description, _id }) => {

    return (
        <Card className="UserCard mb-4">

            <Card.Body>

                <p>Mi viaje es de  {origin} a {destination} </p>
                <Link to={`/events/details/${_id}`}>
                    <div className="d-grid">
                        <Button variant="dark" size="sm" as="div">Ver detalles</Button>
                    </div>
                </Link>

            </Card.Body>
        </Card >
    )
}

export default EventCard