import { useParams } from 'react-router-dom';
import io from 'socket.io-client'

const socket = io("http://localhost:4000")


export default socket;