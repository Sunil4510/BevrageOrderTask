import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LoginModal from "./loginModal";
import { BrowserRouter as Router } from "react-router-dom";
const mockDispatchFn = jest.fn();

jest.mock("../../forgotPassword/forgotPassword", () => () => {
  return;
});

jest.mock("../../resendConfirmation/resendConfirmation", () => () => {
  return;
});

jest.mock("../../confirmSignUp/confirmSignUp", () => () => {
  return;
});

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatchFn,
}));

describe("", () => {
  const initialState = {
    login: { showLoginModal: true, isAuthenticated: false },
    search: {},
    profile: {},
    createBatch: {},
    batchList: {},
    batchSummary: {},
    signUp: { openVerifySignupModal: true },
    forgotPassword: { passwordChanged: false },
    batchResult: {},
    resendConfirmation: { mailSent: false },
  };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store;

  test("navigate to search page", async () => {
    initialState.login.isAuthenticated = true;
    store = mockStore(initialState);
    render();
    expect(mockDispatchFn).toHaveBeenCalled();
  });

  test("it show close-btn", async () => {
    store = mockStore(initialState);
    render();
    const closeBtnComp = screen.getByTestId("close-btn");
    expect(closeBtnComp).toBeInTheDocument();
    fireEvent.click(closeBtnComp);
    expect(mockDispatchFn).toHaveBeenCalled();
  });

  test("it show emailField", async () => {
    store = mockStore(initialState);
    render();
    const emailInputComponent =
      screen.getByTestId("emailField")?.lastElementChild?.firstElementChild;
    expect(emailInputComponent).toBeInTheDocument();
    fireEvent.change(emailInputComponent, {
      target: { value: "samarth.athreya@facctum.com" },
    });
    expect(emailInputComponent.value).toBe("samarth.athreya@facctum.com");
    fireEvent.keyPress(emailInputComponent, { key: "Enter", charCode: 13 });
    const emailErrorMessage = screen.getByTestId("emailErrorMessage");
    expect(emailErrorMessage).toBeInTheDocument();
  });

  test("it show password Field", async () => {
    store = mockStore(initialState);
    render();
    const passwordInputComponent =
      screen.getByTestId("passwordField")?.firstElementChild;
    expect(passwordInputComponent).toBeInTheDocument();
    fireEvent.change(passwordInputComponent, {
      target: { value: "Facctum@123" },
    });
    expect(passwordInputComponent.value).toBe("Facctum@123");
    fireEvent.keyPress(passwordInputComponent, { key: "Enter", charCode: 13 });
    const passwordErrorMessage = screen.getByTestId("passwordErrorMessage");
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  test("password Field blur test", async () => {
    store = mockStore(initialState);
    render();
    const passwordInputComponent =
      screen.getByTestId("passwordField")?.firstElementChild;
    fireEvent.change(passwordInputComponent, {
      target: { value: "Facctum@123" },
    });
    expect(passwordInputComponent.value).toBe("Facctum@123");
    fireEvent.blur(passwordInputComponent);
    const passwordErrorMessage = screen.getByTestId("passwordErrorMessage");
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  test("it show test for submit click", async () => {
    store = mockStore(initialState);
    render();
    const emailInputComponent =
      screen.getByTestId("emailField")?.lastElementChild?.firstElementChild;
    fireEvent.change(emailInputComponent, {
      target: { value: "samarth.athreya@facctum.com" },
    });
    const passwordInputComponent =
      screen.getByTestId("passwordField")?.firstElementChild;
    fireEvent.change(passwordInputComponent, {
      target: { value: "Facctum@123" },
    });
    const submitButtonComponent = screen.getByTestId("submitButton");
    fireEvent.click(submitButtonComponent);
    expect(mockDispatchFn).toHaveBeenCalled();
  });

  test("it  test for forgot password click", async () => {
    store = mockStore(initialState);
    render();
    const forgotPasswordButton = screen.getByTestId("forgotPasswordButton");
    expect(forgotPasswordButton).toBeInTheDocument();
    fireEvent.click(forgotPasswordButton);
  });

  test("it  test for continue verification click", async () => {
    store = mockStore(initialState);
    render();
    const ContinueVerificationButton = screen.getByTestId(
      "ContinueVerificationButton"
    );
    expect(ContinueVerificationButton).toBeInTheDocument();
    fireEvent.click(ContinueVerificationButton);
    expect(mockDispatchFn).toHaveBeenCalled();
  });

  test("it test for render confirmVerificationModal ", async () => {
    initialState.signUp.openVerifySignUpModal = true;
    store = mockStore(initialState);
    render();
  });

  test("it  test for openVerifySignUpModal", async () => {
    initialState.signUp.openVerifySignUpModal = true;
    store = mockStore(initialState);
    render();
  });
});


// function Orders(){
//     const[order,setorder] = useState([]);
//     return(
//         <div key="unique">
//             <button onClick={()=>setorder([{id:1,category:"tea",flavour:"lemon tea"}])}>Place Order</button>
//             {order && order.map((item,idx)=>{
//                 return(
//                     <ul data-testid="allorders" key={idx}>
//                         <li>{item.id}</li>
//                         <li>{item.category}</li>
//                         <li>{item.flavour}</li>
//                     </ul>
//                 )
//             })}
//         </div>
//     )
// } 

// it("button click",()=>{
//     render(<Drinks/>);
//     const allorders = screen.getByText("Place Order")
//     userEvent.click(allorders)
//     expect(screen.getByTestId("ordered")).toBeInTheDocument()
//     // const {asFragment} = render(<Orders order={{id:1,category:"tea",flavour:"lemon tea"}}/>)
//     // expect(asFragment(<Orders order={{id:1,category:"tea",flavour:"lemon tea"}}/>)).toMatchSnapshot();
//     // expect(screen.getByTestId("allorders")).toBeInTheDocument()
//     // const id = screen.getByText("lemon tea");
//     // expect(id).toHaveTextContent("lemon tea")
// })


// it('should correctly set default option', async () => {

//     const spyOnSelectChange = jest.fn();
//     render(<Drinks/>)
//     const selectEl = screen.getByTestId("select-testing");
//     expect(selectEl).toBeInTheDocument()
    
//     const button = within(selectEl).getByRole('button');
//     fireEvent.mouseDown(button);

//     const listbox = within(screen.getByRole('presentation')).getByRole(
//       'listbox'
//     );

//     const options = within(listbox).getAllByRole('option');
//     const optionValues = options.map((li) => li.getAttribute('data-value'));

//     expect(optionValues).toEqual(['Coffee', 'ColdDrink','Tea']);

//     fireEvent.click(options[1]);
//     console.log(options)
//     console.log(spyOnSelectChange)
//     expect(spyOnSelectChange).toHaveBeenCalled();
//   }
//   );
 
//   it('should allow user to change country', () => {
//     render(<Drinks />)
//     userEvent.selectOptions(
//       // Find the select element
//       screen.getByRole('select'),
//       // Find and select the Ireland option
//       screen.getByRole('option', {Category: 'Tea'}),
//     )
//     expect(screen.getByRole('option', {Category: 'Tea'}).selected).toBe(true)
//   })

// import { fireEvent, render, screen, within } from '@testing-library/react';
// import { MenuItem, Select } from '@mui/material';

// describe('MUI Select Component', () => {
//   it('should have correct options an handle change', () => {
//     const spyOnSelectChange = jest.fn();

//     const { getByTestId } = render(
//       <div>
//         <Select
//           data-testid={'component-under-test'}
//           value={''}
//           onChange={(evt) => spyOnSelectChange(evt.target.value)}
//         >
//           <MenuItem value="menu-a">OptionA</MenuItem>
//           <MenuItem value="menu-b">OptionB</MenuItem>
//         </Select>
//       </div>
//     );

//     const selectCompoEl = getByTestId('component-under-test');

//     const button = within(selectCompoEl).getByRole('button');
//     fireEvent.mouseDown(button);

//     const listbox = within(screen.getByRole('presentation')).getByRole(
//       'listbox'
//     );

//     const options = within(listbox).getAllByRole('option');
//     const optionValues = options.map((li) => li.getAttribute('data-value'));

//     expect(optionValues).toEqual(['menu-a', 'menu-b']);

//     fireEvent.click(options[1]);
//     expect(spyOnSelectChange).toHaveBeenCalledWith('menu-b');
//   });
// });