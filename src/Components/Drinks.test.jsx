import React from "react";
import { render,cleanup, screen, within, fireEvent } from "@testing-library/react";
import Drinks from "./Drinks";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import App from "../App";
import store from "../redux/store";

function Checker(){
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

afterEach(cleanup)
it("Drinks is present",async()=>{
    render(<Drinks/>);
    expect(screen.getByTestId("drink")).toBeInTheDocument();
}) 

it("yes redux is working fine",()=>{
    render(<Checker/>)
    const changeTheme = screen.getByTestId("themes")
    userEvent.click(changeTheme);
    expect(screen.getByTestId("themes")).toHaveTextContent("dark")
    userEvent.click(changeTheme);
    expect(screen.getByTestId("themes")).toHaveTextContent("light")
})

describe('MUI Select Component', () => {
    it('Drink component works correct', () => {
      let spyOnSelectChange = jest.fn();
      let spySnackBar = jest.fn();
        render(<Drinks spyOnSelectChange={spyOnSelectChange} spySnackBar={spySnackBar}/>)

        /*selecting category  */
    
      const button = within(screen.getByTestId('select-testing')).getByRole('button');
      fireEvent.mouseDown(button);
  
      const listbox = within(screen.getByRole('presentation')).getByRole(
        'listbox'
      );
  
      const options = within(listbox).getAllByRole('option');
      const optionValues = options.map((li) => li.getAttribute('data-value'));
  
      expect(optionValues).toEqual(['Coffee', 'ColdDrink','Tea']);
  
      fireEvent.click(options[2]);
      expect(spyOnSelectChange).toHaveBeenCalledWith({"category": "Tea", "flavour": "", "id": 1});

        /*selecting category end */


        /*selecting flavour */

      const button2 = within(screen.getByTestId('select-flavour')).getByRole('button');
      fireEvent.mouseDown(button2);
  
      const listbox2 = within(screen.getByRole('presentation')).getByRole(
        'listbox'
      );
  
      const options2 = within(listbox2).getAllByRole('option');
      const optionValues2 = options2.map((li) => li.getAttribute('data-value'));
  
      expect(optionValues2).toEqual(['Black Tea', 'Green Tea','Lemon Tea']);
  
      fireEvent.click(options2[2]);
      expect(spyOnSelectChange).toHaveBeenCalledWith({"category": "Tea", "flavour": "Lemon Tea", "id": 1});

        /*selecting flavour end*/


      /*placing order */

      const allorders = screen.getByText("Place Order")
      userEvent.click(allorders)
      expect(spyOnSelectChange).toHaveBeenCalledWith([{ id: 1,
      category: "Tea",
      flavour: "Lemon Tea"}])

    /*placing order end*/
    userEvent.click(allorders)
    expect(spySnackBar).toHaveBeenCalledWith(true)
    expect(screen.getByTestId("snackbar-testing")).toBeInTheDocument();
    /*Snackbar */

    /*Snackbar end */ 

    /* changing order*/
        
      /*selecting category */

      const buttons = within(screen.getByTestId('orders-select-category')).getByRole('button');
      fireEvent.mouseDown(buttons);
  
      const listboxes = within(screen.getByRole('presentation')).getByRole(
        'listbox'
      );
  
      const optionsleft = within(listboxes).getAllByRole('option');
      const optionValuesLeft = optionsleft.map((li) => li.getAttribute('data-value'));
  
      expect(optionValuesLeft).toEqual(['Tea','Coffee','ColdDrink']);
  
      fireEvent.click(optionsleft[1]);
        
      //expect(spyOnSelectChange).toHaveBeenCalledWith([{"category":"Coffee","flavour":"","id":2}]);

      //expect(spyOnSelectChange).toHaveBeenCalledWith('ColdDrink');

      /*selecting category end */


        /*selecting flavour */

      const buttons2 = within(screen.getByTestId('orders-select-flavour')).getByRole('button');
      fireEvent.mouseDown(buttons2);
  
      const listboxes2 = within(screen.getByRole('presentation')).getByRole(
        'listbox'
      );
  
      const optionsleft2 = within(listboxes2).getAllByRole('option');
      const optionValuesleft2 = optionsleft2.map((li) => li.getAttribute('data-value'));
  
      expect(optionValuesleft2).toEqual(['Americano','Black Coffee','Cappuccino']);
  
      fireEvent.click(optionsleft2[2]);
      expect(spyOnSelectChange).toHaveBeenCalledWith([{"category":"Tea","flavour":"Lemon Tea","id":1}]);

        /*selecting flavour end*/


      /*changing order end*/

        /* selecting only category */
        // fireEvent.mouseDown(within(screen.getByTestId('select-testing')).getByRole('button'));
    
        // //const optionsleft = within(listboxes).getAllByRole('option');
        // const optionValuesLeftNow = optionsleft.map((li) => li.getAttribute('data-value'));
    
        // expect(optionValuesLeftNow).toEqual(['Coffee','ColdDrink','Tea']);
    
        // fireEvent.click(optionsleft[1])
        // /* selecting only category end */
        /*submit order */

        userEvent.click(screen.getByTestId("submit-order"))
        expect(spyOnSelectChange).toHaveBeenCalledWith([{ id: 1,
            category: "Tea",
            flavour: "Lemon Tea"}])

        /*submit order end */

      /* deleting order*/
      const delete_order = screen.getByTestId("delete-order");
      userEvent.click(delete_order)
      expect(spyOnSelectChange).toHaveBeenCalledWith([])
        /*deleting order end */

      /*reset-order */
      fireEvent.click(screen.getByTestId("reset-order"))
      expect(spyOnSelectChange).toHaveBeenCalledWith([])  
      /*reset order end */

    });
  });