import { useEffect, useRef, useState } from "react"
import ResultImage from "./ResultImage"
const url = 'https://api.pexels.com/v1/'

export default function Main() {
    const [imageResults, setImageResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const searchRef = useRef()

    let getImages = async () => {
        setIsLoading(true)
        try {
            let results = await fetch(url+"curated?per_page=20", {
                headers: {
                    "Authorization": "563492ad6f917000010000014e82d463fd4b446bacb18914857d129e"
                }
            })
            let data = await results.json()
            setImageResults(data.photos)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            alert('Error: ' + error)
        }
    }

    let keyPressHandler = (e) => {
        if(e.key === 'Enter'){
            searchHandler()
        }
    }

    let searchHandler = async () => {
        if (searchRef.current.value.trim().length === 0) {
            alert('Search Query cannot be empty!')
            return
        }
        else {
            setIsLoading(true)
            try {
                let results = await fetch(`${url}search?query=${searchRef.current.value}&per_page=20`, {
                    headers:{
                        "Authorization": "563492ad6f917000010000014e82d463fd4b446bacb18914857d129e"
                    }
                })
                let data = await results.json()
                setImageResults(data.photos)
                setIsLoading(false)
                searchRef.current.value = ''
            }
            catch (error) {
                setIsLoading(false)
                alert('Error: ' + error)
            }
        }
    }

    useEffect(() => {
        getImages()
    }, [])
    return (
        <div className="container">
            <div className="search-bar">
                <input type="text" ref={searchRef} placeholder = 'e.g. apples, nature, etc.'  onKeyPress = {keyPressHandler}/>
                <button className="search" onClick={searchHandler}>Search</button>
            </div>
            <div className="display-results">
                {isLoading ?
                    <h1>Loading...</h1> :
                    imageResults.length === 0 ? <h1>Query didn't match any results. Try Again!</h1> :
                        imageResults.map((image, index) => <ResultImage value={image} key={index} />)
                }
            </div>
        </div>

    )
}