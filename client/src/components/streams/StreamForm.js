import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  // 4 Handle errors with redux-form. Destructure meta argument and pull out error, touched.
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // 1 Input with redux-form.  Form props destructured.
  renderInput = ({ input, label, meta }) => {
    // console.log(meta); // Will contain validation errors

    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />

        {/* <div>{meta.error}</div> */}
        {this.renderError(meta)}
      </div>
    );
  };

  // 2 Submit form with redux-form
  onSubmit = (formValues) => {
    // event.preventDefault(); // No longer needed.  redux-form automatically applies this behavior
    // Usually onSubmit(event) argument is what is passed.  Now with redux-form we get the <Field> input values as arguments

    // console.log(formValues);
    this.props.onSubmit(formValues); // Call createStream action creator
  };

  render() {
    // console.log(this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)} // Remember this.props.handleSubmit is provided by redux-form
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// 3 Validation with redux-form. Empty errors object indicate no errors. This function is wired to redux-form at export default.
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

// 4 Redux-form
export default reduxForm({
  form: "streamForm", // a unique identifier for this form
  validate: validate,
})(StreamForm);
