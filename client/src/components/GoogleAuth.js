import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  // state = {
  //   isSignedIn: null, // null because we do not know if the user is signed in or not signed in when our application first loads
  // };

  componentDidMount() {
    // Load additional modules
    window.gapi.load("client:auth2", () => {
      // Initializes the GoogleAuth object. If the user has already signed in, the GoogleAuth object restores the user's sign-in state from the previous session.
      // When you initialize the GoogleAuth object, you configre the objet with your OAuth 2.0 client ID and any additional options you want to specify.
      // Also returns gapi.auth2.GoogleAuth object.
      window.gapi.client
        .init({
          clientId:
            "1029807907749-a8snu3tfvj6tcd1qfmdcu5cv1patb7mb.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // Get a reference to the GoogleAuth object
          this.auth = window.gapi.auth2.getAuthInstance();

          // On initial load set isSignedIn inside of redux store based on GAPI state.
          // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.onAuthChange(this.auth.isSignedIn.get());

          // Register listener to listen to changes to GAPI isSignedIn state.
          // Note .listen(listener) --> .listen() passes true to the listener function when the user signs in.  Listener is a function that takes in a boolean argument.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // Set isSignedIn redux state based on GAPI state
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId()); // Capture userId as payload for current user signed in to our app.
    } else {
      this.props.signOut();
    }

    // this.setState({ isSignedIn: this.auth.isSignedIn.get() }); // .isSigneIn.get() is not needed because this listener is passes in a boolean argument received from the .listen() function.
  };

  // Update the GoogleAuth object
  onSignInClick = () => {
    this.auth.signIn({ prompt: "select_account" }); // Add argument to have app prompt every time.
  };

  // Update the GoogleAuth object
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

/*
  https://developers.google.com/identity/sign-in/web/reference
  clentId - used to identify a single app to Google's OAuth servers.
  Load client:auth2 libraries and then initialize via callback.
*/
