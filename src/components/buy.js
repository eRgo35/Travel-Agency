import React from 'react'


export default function Buy(props){
    let state = props.location.state;
    delete state.redirect;
    let transactionId = "mspfj34i90cc23ir";
    let stateNames = Object.getOwnPropertyNames(state)
    stateNames = stateNames.map((el)=>/^[A-Z]{1}.*/.exec(el)).filter((el)=>el!==""&&el!==null&&el!==undefined)
    console.log(stateNames);
    return(
        <div className="buyWrapperWrapper">
            <div className="buyWrapper">
                <div className="buyTitle">Transaction Receipt</div>
                <div className="buyDetails">
                    <span>Transaction ID: <pre>{transactionId}</pre></span>
                    <span>Country: <pre>{state.country}</pre></span>
                    <span>City: <pre>{state.city}</pre></span>
                    <span>Room: <pre>{state.room}</pre></span>
                    <span>Selected Excursions: <br /> 
                        <pre className="exc">
                            {stateNames[0]===undefined?"":stateNames[0]}
                        </pre>
                        <br />
                        <pre className="exc">
                            {stateNames[1]===undefined?"":stateNames[1]}
                        </pre>
                        <br />
                        <pre className="exc">
                            {stateNames[2]===undefined?"":stateNames[2]}
                        </pre>
                        <br />
                        <pre className="exc">
                            {stateNames[3]===undefined?"":stateNames[3]}
                        </pre>
                    </span>
                    <span>All-Inclusive: <pre>{ state.allinclusive ? "Yes" : "No" }</pre></span>
                    <span>"Beautiful-View" Offer: <pre>{ state.beautifuloffer ? "Yes" : "No" }</pre></span>
                    <br />
                    <span>Email: <pre>{ state.email }</pre></span>
                </div>
            </div>
        </div>
    )
}