import { Link } from "react-router-dom"

export default function CardPadel({ id, location, image, owner }){
    return(
        <div>
            <Link to={`detail/${id}`}>
                <img src={image} alt={id}/>
                <div>
                    <h1>{owner}</h1>
                    <div>
                        <img/>
                        <h3>{location}</h3>
                    </div>
                </div>
            </Link>
        </div>
    )
}