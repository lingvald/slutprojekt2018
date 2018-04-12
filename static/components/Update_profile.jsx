import React, { Component } from 'react';

class UpdateProfile extends Component {
    render(){
        return (
        <div id="contact-form">
            <form id="profile-form" action="/userinfo" autoComplete="off" method="post">
                    <h4 id="heading-contact-form">Lägg till information om dig</h4>
                    <input required name="age" placeholder="Ålder" type="number"></input>
                    <input required name="city" placeholder="Stad" type="text"></input>
                    <input required name="image" placeholder="Bildadress, url" typ="text"></input>
                    <select required name="sex">

                        <option value="kvinna">Kvinna</option>
                        <option value="man">Man</option>
                    </select>
                    <textArea required id="bio-holder" name="bio" placeholder="bio" type="text"></textArea>
                    <button id="form-button"><i className="fa fa-check-circle"></i></button>
            </form>
        </div>
        )
    }
}

export default UpdateProfile;
