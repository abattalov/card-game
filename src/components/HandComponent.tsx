import Card from '/src/components/Card';

interface HandComponentProps {
    hand: Card[];
}

function HandComponent({hand}: HandComponentProps){


    return (
        <div>
            {hand.map((card, index) => {
                return (
                    <Card key={`p1-${index}`} card={card}/>
                );
            })}
        </div>
    );
}

export default HandComponent;