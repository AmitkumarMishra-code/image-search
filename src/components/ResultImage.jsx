export default function ResultImage(props){
    console.log(props)
    return(
        <div className="image">
            <img src={props.value.src.medium} alt="" />
        </div>
    )
}