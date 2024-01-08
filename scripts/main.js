let id = document.getElementById("cm").getAttribute("data-id");

let form = false;
let error = false;

const getData = () => {
  fetch(`http://localhost:5000/api/scripts/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      form = data;
      createForm();
      console.log(`form`)
    })
    .catch((error) => {
      error = true;
      console.log(error);
    });
};
getData();

/*
    user_id: { type: String, required: true },
    bgcolor: { type: String, required: true },
    fontcolor: { type: String, required: true },
    inputbgcolor: { type: String, required: true },
    btncolor: { type: String, required: true },
    btntxtcolor: { type: String, required: true },
    inputtxtcolor: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    reply_email: { type: Boolean, required: true },
    reply_email_content: { type: String, required: true },
    premium: { type: Boolean, required: true },
    namefield: { type: Boolean, required: true },
    emailfield: { type: Boolean, required: true },
    bodyfield: { type: Boolean, required: true },
    status: { type: Boolean, required: true },
*/

createForm = () => {

  //create wrapper
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", "wrapper");
  document.body.appendChild(wrapper);

  //create heading
  const heading = document.createElement("h1");
  heading.setAttribute("id", "heading");
  if (form.title) {
    heading.innerHTML = form.title;
  } else {
    heading.innerHTML = "contact me";
  }

  //get the wrapper element
  document.getElementById("wrapper").appendChild(heading);

  //create email input
  if (form.emailfield) {
    const email = document.createElement("input");
    email.setAttribute("type", "text");
    email.setAttribute("placeholder", "enter your email");
    email.setAttribute("id", "email");
    document.getElementById("wrapper").appendChild(email);
  }

  //create name field
  if (form.namefield) {
    const fullname = document.createElement("input");
    fullname.setAttribute("type", "text");
    fullname.setAttribute("placeholder", "enter your name");
    fullname.setAttribute("id", "name");
    document.getElementById("wrapper").appendChild(fullname);
  }

  //create body input
  if (form.bodyfield) {
    const body = document.createElement("textarea");
    body.setAttribute("placeholder", "say hello");
    body.setAttribute("id", "body");
    document.getElementById("wrapper").appendChild(body);
  }

  //create the submit button
  const but = document.createElement("button");
  but.setAttribute("id", "but");
  but.innerText = "send message";
  document.getElementById("wrapper").appendChild(but);
  but.setAttribute("onClick", "handleClick()");

  const sendingmessage = document.createElement("p");
  sendingmessage.setAttribute("id", "sendingmessage");
  sendingmessage.innerText = "sending email";
  document.getElementById("wrapper").appendChild(sendingmessage);

  const sentmessage = document.createElement("p");
  sentmessage.setAttribute("id", "sentmessage");
  sentmessage.innerText = "message sent";
  document.getElementById("wrapper").appendChild(sentmessage);

  /*
  document.getElementById('sendingmessage').style.display = "block"
  document.getElementById('sendingmessage').style.display = "none"
  document.getElementById('sentmessage').style.display = "block"
*/

  document.getElementById("sentmessage").style.display = "none";
  document.getElementById("sendingmessage").style.display = "none";

  console.log("creating style");
  const style = document.createElement("style");

  style.innerHTML = `
    #wrapper {
        background-color:azure;
        display:flex;
        flex-direction:column;
        justify-content: center;
        text-align: center;
        align-items: center;
        margin: 0;
        padding: 20px;
        color:$'red';
    }

    #wrapper *{
        margin:6px;
    }

    #wrapper input{
        height: 40px;
        width: 300px;
        border:none;
        outline:none;
        transition:all 1s;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border: 1px solid transparent;

    }

    #wrapper textarea{
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        height: 200px;
        width: 300px;
        border:none;
        outline:none;
        transition:all 1s;
        border: 1px solid transparent;

    }

    #wrapper button{
        padding: 10px 20px;
        background-color: 'black';
        color: 'white';
        border: none;
        outline:none;
        width:300px;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        margin-top:20px;
    }

    #wrapper #heading{
      margin-bottom:20px;
  }

    #wrapper textarea:focus{
      border: 1px solid black;
        }

    #wrapper input:focus{
      border: 1px solid black;
    }

    @media(min-width: 600px) {
      #wrapper input{
        width: 600px;
    }

    #wrapper textarea{
        width: 600px;
    }
    #wrapper button{
      width:320px;
  }
    }
`;

  document.head.appendChild(style);
  console.log("style cretaed");
};

function handleClick() {
  document.getElementById("sendingmessage").style.display = "block";
  document.getElementById("but").style.display = "none";
  fetch(`http://localhost:5000/api/message/${form._id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // your expected POST request payload goes here
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      body: document.getElementById("body").value,
      recipient: form.email,
      reply_email:form.reply_email,
      reply_email_content:form.reply_email_content
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("sendingmessage").style.display = "none";
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("body").value = "";
      document.getElementById("sentmessage").style.display = "block";
      setTimeout(() => {
        document.getElementById("sentmessage").style.display = "none";
        document.getElementById("but").style.display = "block";
      }, 2000);
    })
    .catch((error) => {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    });
}

/*get requests*/
/*
 fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(data => {
   // enter you logic when the fetch is successful
    console.log(data)
  })
  .catch(error => {
    // enter your logic for when there is an error (ex. error toast)
   console.log(error)
  })
*/

/*
        const axiosGetCall = async () => {
            try {
              const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    // enter you logic when the fetch is successful
              console.log(`data: `, data)
           
            } catch (error) {
    // enter your logic for when there is an error (ex. error toast)
              console.log(`error: `, error)
            }
          }
    
    axiosGetCall()
*/

/*
const axiosPostCall = async () => {
    try {
      const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts',  {
      // your expected POST request payload goes here
      title: "My post title",
      body: "My post content."
      })
   // enter you logic when the fetch is successful
      console.log(`data: `, data)
   
    } catch (error) {
  // enter your logic for when there is an error (ex. error toast)
      console.log(`error: `, error)
    }
  }


axiosPostCall()
*/
