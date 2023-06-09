// Stylesheets
import './styles/Point.css';

function Point(props) {
    return (
        <div className="Point">
            <svg viewBox='0 0 210.000 297'>
                <path stroke={props.color} fill={"transparent"} d="m 198.24042,148.5 c 0,51.49526 -41.74516,93.24042 -93.24042,93.24042 -51.495262,0 -93.240419,-41.74516 -93.240417,-93.24042 0,-51.49526 41.745157,-93.240417 93.240417,-93.240417 51.49526,-2e-6 93.24042,41.745155 93.24042,93.240417 z" />
                <path fill={props.color} stroke={"transparent"} d="m 152.92732,148.5 c 0,26.46953 -21.45779,47.92732 -47.92732,47.92732 -26.469528,0 -47.927321,-21.45779 -47.927322,-47.92732 10e-7,-26.46953 21.457794,-47.92732 47.927322,-47.92732 26.46953,0 47.92732,21.45779 47.92732,47.92732 z" />
                <path fill={props.color} stroke={"transparent"} d="M 12.120728,55.645695 C 63.465721,4.3007882 146.5377,4.2680997 197.88269,55.622188 l 8.31527,-8.315191 C 150.35906,-8.5319465 59.644362,-8.4992581 3.8054359,47.330504 Z" />
                <path fill={props.color} stroke={"transparent"} d="m 197.88098,241.35437 c -51.345,51.3449 -134.416962,51.37759 -185.761969,0.0235 l -8.3152683,8.31521 C 59.642641,305.53202 150.35735,305.49934 206.19626,249.66958 Z" />
            </svg>
        </div>
    )
}

export default Point
