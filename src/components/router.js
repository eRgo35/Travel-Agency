import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {db} from '../firebase';
import firebase from 'firebase';

export default function RouterCreator(props){
    const Routes = props.loc.location.map((location, i)=>{
        return (
            <Route path={"/"+location.country} key={location.city+" Route"}>
                <PageCreator location={location}/>
            </Route>
        )
    })
    return (
        <div className="MainWrapper">
            {Routes}
        </div>
        )
}

class PageCreator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            country:this.props.location.country,
            city:this.props.location.city,
            redirect:false,
            transactionID:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }
    async handleSubmit(event){ 
        let exc = Object.getOwnPropertyNames(this.state).map((el)=>/^[A-Z]{1}.*/.exec(el)).filter((el)=>el!==""&&el!==null&&el!==undefined);
        event.preventDefault();
        try {
            if(!this.validateEmail(this.state.email)){
                throw new Error(`Invalid Email: ${this.state.email}`)
            }
            await db.collection("transactions").add({
                country: this.state.country,
                city: this.state.city,
                room: this.state.room,
                excursions: [exc[0]===undefined?{option1:""}:{option1:exc[0]},
                             exc[1]===undefined?{option2:""}:{option2:exc[1]},
                             exc[2]===undefined?{option3:""}:{option3:exc[2]},
                             exc[3]===undefined?{option4:""}:{option4:exc[3]}],
                allinclusive: this.state.allinclusive ?? null,
                beautifulview:this.state.beautifulview ?? null,
                email: this.state.email,
                created: firebase.firestore.FieldValue.serverTimestamp()
             }).then(doc => {
                 this.setState({transactionID: doc.id});
             });
             this.setState({redirect:true});
        }
        catch (err) {
            document.querySelector(".error").innerHTML = "Please fill in all required fields!";
        }
        
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    render(){
        if(this.state.redirect){
            return <Redirect to={{
                    pathname: "/buy",
                    state: this.state, 
                  }}/>
                
        }
        else{
            return(
                <div className="pageWrapperWrapper">
                    <div className="pageWrapper">
                        <div className="pageImgWrapper">
                            <img className="pageImg" src={this.props.location.img} alt=""/>
                        </div>
                        <div className="pageTitle">{this.props.location.country}</div>
                        <div className="pageSubtitle">{this.props.location.city}</div>
                        <div className="pageDetails">{this.props.location.details}</div>
                        <div className="pageDetailsMore">{this.props.location.moredetails}</div>
                        <div className="pageDetailsMore">{this.props.location.moredetails}</div>
                        <div className="pagePrice">Price: ${this.props.location.price}</div>
                        <form className="pageBuy">
                            <span>Room Type: <b>*</b></span>
                            <span><input type="radio" onChange={this.handleInputChange} id="single" name="room" value="Single Room" required/><label htmlFor="single"> Single Room</label></span>
                            <span><input type="radio" onChange={this.handleInputChange} id="double" name="room" value="Double Room" required/><label htmlFor="double"> Double Room</label></span>
                            <span><input type="radio" onChange={this.handleInputChange} id="triple" name="room" value="Triple Room" required/><label htmlFor="triple"> Triple Room</label></span>
                            <span><input type="radio" onChange={this.handleInputChange} id="apartment" name="room" value="Apartment" required/><label htmlFor="apartment"> Apartment</label></span>
                            <br />
                            <span>Additional Excursions:</span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id={this.props.location.excursions[0]} name={this.props.location.excursions[0]} value={this.props.location.excursions[0]} /><label htmlFor={this.props.location.excursions[0]}> {this.props.location.excursions[0]}</label></span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id={this.props.location.excursions[1]} name={this.props.location.excursions[1]} value={this.props.location.excursions[1]} /><label htmlFor={this.props.location.excursions[1]}> {this.props.location.excursions[1]}</label></span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id={this.props.location.excursions[2]} name={this.props.location.excursions[2]} value={this.props.location.excursions[2]} /><label htmlFor={this.props.location.excursions[2]}> {this.props.location.excursions[2]}</label></span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id={this.props.location.excursions[3]} name={this.props.location.excursions[3]} value={this.props.location.excursions[3]} /><label htmlFor={this.props.location.excursions[3]}> {this.props.location.excursions[3]}</label></span>
                            <br />
                            <span>Optional Offers:</span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id="all-inclusive" name="allinclusive" value="All-Inclusive" /><label htmlFor="all-inclusive"> All-Inclusive</label></span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id="beautiful-view" name="beautifulview" value="&quot;Beautiful View&quot; Offer" /><label htmlFor="beautiful-view"> "Beautiful View" Offer</label></span>
                            <br />
                            <label htmlFor="email" className="email">Email: <b>*</b></label>
                            <input type="email" onChange={this.handleInputChange} id="email" name="email" placeholder="email@example.com" required />
                            <br />
                            <p className="error"></p>
                            <button className="pageBuyButton" onClick={this.handleSubmit}>Buy</button>
                        </form>
                    </div>
                </div>
                //todo Display details from db
            )
        }
    }
}
// this.location.excursions[0]