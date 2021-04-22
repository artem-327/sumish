import PropTypes from "prop-types";
import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Backend from '../../@utils/BackendUrl';
import axios from 'axios';
import swal from 'sweetalert';
const CustomForm = ({
  status,
  message,
  onValidated,
  spaceTopClass,
  subscribeBtnClass
}) => {
  let email;
  const submit = () => {
    email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value
      });
    axios.post(Backend.URL + '/subscribe', {email: email.value}, { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} }).then((res) => {
      if(res.data.status === 'success') {
        swal("Subscribed!", "You have just enrolled on this website!", "success");
      } else {
        swal("Oops!", "Something went wrong, Retype your email and click the SUBSCRIBE button again", "error");
      }
    }
    ).catch(function(err){
      console.log(err);
      swal("Oops!", "Something went wrong, Retype your email and click the SUBSCRIBE button again", "error");
    });
    email.value = "";
  };

  return (
    <div className={`subscribe-form-3 ${spaceTopClass ? spaceTopClass : ""}`}>
      <div className="mc-form">
        <div>
          <input
            className="email"
            ref={node => (email = node)}
            type="email"
            placeholder="Type your email here and click the SUBSCRIBE button below"
            required
          />
        </div>
        {status === "sending" && (
          <div style={{ color: "#3498db", fontSize: "12px" }}>sending...</div>
        )}
        {/* {status === "error" && (
          <div
            style={{ color: "#e74c3c", fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            style={{ color: "#2ecc71", fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )} */}
        <div
          className={`clear-3 ${subscribeBtnClass ? subscribeBtnClass : ""}`}
        >
          <button className="button" onClick={submit}>
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

const SubscribeEmailTwo = ({
  mailchimpUrl,
  spaceTopClass,
  subscribeBtnClass
}) => {
  return (
    <div>
      <MailchimpSubscribe
        url={mailchimpUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
            spaceTopClass={spaceTopClass}
            subscribeBtnClass={subscribeBtnClass}
          />
        )}
      />
    </div>
  );
};

SubscribeEmailTwo.propTypes = {
  mailchimpUrl: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SubscribeEmailTwo;
