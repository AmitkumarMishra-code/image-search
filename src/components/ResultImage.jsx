export default function ResultImage(props) {
    return (
        <div className="image">
            <a href={props.value.src.landscape}>
                <img src={props.value.src.landscape} alt="" />
            </a>
        </div>
    )
}