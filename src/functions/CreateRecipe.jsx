import React, { Component, Fragment } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';

class CreateRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            inputs: ['input-0'],
            recipeParts: [{ingrediant:''}],
            recipeSuccess: false,
            errorMessage: '',
        };

        this.onSubmitRecipe = this.onSubmitRecipe.bind(this);
        this.onChangeRecipeName =this.onChangeRecipeName.bind(this);
        this.onChangeRecipeParts = this.onChangeRecipeParts.bind(this);  
        this.onRemoveRecipePart = this.onRemoveRecipePart.bind(this); 
    }

    form() {
        return(
         <Fragment>   
            <form  onSubmit={this.onSubmitRecipe}>
                <label>Recipe Name</label><br/>
                <input id="name" type="text" onChange={event => this.onChangeRecipeName(event)} required></input><br/><br/>
                <label>Ingrediants</label><br/>
                <div id="dynamicInput">
                        {this.state.inputs.map((input, index) => 
                        <li key={index} >
                            <input onChange={event => this.onChangeRecipeParts(event, index)} required/>
                            <input type='button' value='-' onClick={event => this.onRemoveRecipePart(event, index)} />
                        </li>)}
                        <button onClick={ (e) => this.appendIngrediant(e) }>
                   +
                    </button>
                </div>
                
                <button  type="submit" >Add Recipe</button>
            </form>
            
         </Fragment>);
    }
    onChangeRecipeName(event) {
        this.setState({name: event.target.value});
    }
    onRemoveRecipePart(event, index) {
        event.preventDefault();
        var recipeParts= this.state.recipeParts;
        var inputs = this.state.inputs;
        delete recipeParts[index];
        delete inputs[index];
        this.setState({ recipeParts: recipeParts, inputs: inputs});
    }

    onChangeRecipeParts(event, index) {
        event.persist();
        var key = index
        var item= event.target.value;
        var items = this.state.recipeParts;
        items[key]= {ingrediant: item};
        this.setState({ recipeParts: items});
    }
    
    appendIngrediant(e) {  
        e.preventDefault()
        var newIng = `input-${this.state.inputs.length}`;
        this.setState(prevState => ({ inputs: prevState.inputs.concat([newIng]) }));
    }
    onSubmitRecipe(event) {
        event.preventDefault();
        const db =  firebase.firestore();
       db.collection('recipes').doc().set({
            name: this.state.name,
            recipeParts: this.state.recipeParts
          }).then(function() {
              alert("recipe added successfully");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });        
    }
    render() {
        return(
        <Fragment>
            {this.form()}
        </Fragment>
        );
    }
}
export default CreateRecipe