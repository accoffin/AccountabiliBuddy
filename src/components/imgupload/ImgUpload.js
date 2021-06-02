import React, { Component } from "react";
import service from "../../utils/service";

// Create a new Celebrity with and image upload
export default class ImgUpload extends Component {
  state = {
    name: "",
    occupation: "",
    catchphrase: "",
    image: undefined,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // file upload separate from submit
  fileUpload = (e) => {
    e.preventDefault();
    const imageForm = new FormData();
    const imageFile = e.target.files[0];
    imageForm.append("image", imageFile);

    service.cloudinaryImageUpload(imageForm).then((rfs) => {
      console.log({ rfs });
      this.setState({
        image: rfs.data,
      });
    });
  };

  handleSumbit = (e) => {
    e.preventDefault();
    service.cloudinaryImageUpload(this.state);
  };
  // doing file upload at the same time as submit, you will have to adjust the state
  //   handleSumbit = (e) => {
  //     e.preventDefault();
  //     const form = new FormData();
  //     const { image, name, occupation, catchphrase } = this.state;
  //     form.append("image", image);
  //     form.append("name", name);
  //     form.append("occupation", occupation);
  //     form.append("catchphrase", catchphrase);
  //     service.cloudinaryImageUpload(form).then((rfs) => {
  //       console.log({ rfs });
  //       this.setState({
  //         imageURL: rfs.data.imageURL,
  //       });
  //     });
  //   };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSumbit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="name"
          />
          <input
            type="text"
            name="occupation"
            value={this.state.occupation}
            onChange={this.handleChange}
            placeholder="occupation"
          />
          <input
            type="text"
            name="catchphrase"
            value={this.state.catchphrase}
            onChange={this.handleChange}
            placeholder="catchphrase"
          />
          <input
            type="file"
            width="200px"
            // doing file upload at the same time as submit
            // onChange={(e) => {
            //   this.setState({ image: e.target.files[0] });
            // }}
            onChange={this.fileUpload}
          />
          <button type="submit">Sumbit meh</button>
        </form>
        {/* <img src={this.state.fileURL} /> */}
      </div>
    );
  }
}
