import { useEffect, useRef, useState } from 'react';
import '../styles/Card.css';

export default function Card() {

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const offsetRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 })

    useEffect(() => {
        const onMouseMove = (e) => {
            if (!isDragging) return;

            const newPosition = {
                x: e.clientX - offsetRef.current.x,
                y: e.clientY - offsetRef.current.y
            };

            setPosition(newPosition)
        };

        const onMouseUp = (e) => {
            console.log("unclicked")
            setIsDragging(false);
        };

        if(isDragging){
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('mousemove', onMouseMove);
        }

        return () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }

    }, [isDragging])

    const onMouseDown = (e) => {
        setIsDragging(true);
        const cardElement = e.currentTarget;
        const offset = {
            x: e.clientX - cardElement.getBoundingClientRect().left,
            y: e.clientY - cardElement.getBoundingClientRect().top
        };

        offsetRef.current = offset;
    };

    return (
        <div
            className="card"
            onMouseDown={onMouseDown}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
            <p>Ace of Spades</p>
        </div>
    );
}