import { useCallback, useEffect, useState } from "react";


function Quantity(props) {
    const { onAdd, onRemove, product} = props

    const handleAddButton = () => {
        onAdd(product)
        setAmount(amount + 1)
    }
    const handleRemoveButton = () => {
        onRemove(product)
        if (amount !== 0) {
            setAmount(amount - 1)
        }
    }

    const [amount, setAmount] = useState(0)

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <span>Quantity</span>
                </div>
                <div className="col">
                    <strong>{amount}</strong>
                </div>
                <div className="col">
                    <button type='button' className='special-button' onClick={() => handleAddButton()}>+</button>
                    <button type='button' className='special-button' onClick={() => handleRemoveButton()}>-</button>
                </div>
            </div>
        </div>
)
}

export default Quantity
