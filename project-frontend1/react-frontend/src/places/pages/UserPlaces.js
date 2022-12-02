import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

// const DUMMY_PLACES = [{
//         id: "id1",
//         title: "title1",
//         description: "Once GIT is configured, we can begin using it to access GitHub. Example",
//         imageUrl: "https://www.gstatic.com/webp/gallery/2.webp",
//         address: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
//         location: {
//             lat: 40.785091,
//             lng: 73.968285,
//         },
//         creator: "1",
//     },
//     {
//         id: "id2",
//         title: "title1",
//         description: "Once GIT is configured, we can begin using it to access GitHub. Example",
//         imageUrl: "https://www.gstatic.com/webp/gallery3/2_webp_ll.png",
//         address: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
//         location: {
//             lat: 40.785091,
//             lng: 73.968285,
//         },
//         creator: "u2",
//     },
// ];

const UserPlaces = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;
    const [loadedPlaces, setLoadedPlaces] = useState(null);
    useEffect(() => {
        const fetchPlaces = async() => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeletedHandler = (deletedPlaceId) => {
        console.log("deletedPlaceId----->", deletedPlaceId);
        setLoadedPlaces((prevPlaces) =>
            prevPlaces.filter((place) => place.id !== deletedPlaceId)
        );
    };
    //  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

    return ( <
        React.Fragment >
        <
        ErrorModal error = { error }
        onClear = { clearError }
        /> {
            isLoading && ( <
                div className = "center" >
                <
                LoadingSpinner / >
                <
                /div>
            )
        } {
            !isLoading && loadedPlaces && ( <
                PlaceList items = { loadedPlaces }
                onDeletePlace = { placeDeletedHandler }
                />
            )
        } <
        /React.Fragment>
    );
};

export default UserPlaces;