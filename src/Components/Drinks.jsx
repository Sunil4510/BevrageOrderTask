import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import "./Drinks.scss";
import Orders from "./Orders";
import OrderTable from "./OrderTable";

const Drinks = ({spyOnSelectChange,spySnackBar}) => {
  const flavours = [
    {
      id: 1,
      flavourOne: "Black Tea",
      flavourTwo: "Green Tea",
      flavourThree: "Lemon Tea",
    },
    {
      id: 2,
      flavourOne: "Americano",
      flavourTwo: "Black Coffee",
      flavourThree: "Cappuccino",
    },
    {
      id: 3,
      flavourOne: "Cocacola",
      flavourTwo: "Lassi",
      flavourThree: "thumbsup",
    },
  ];
  const [categorys, setCategory] = useState([
    {
      id: 1,
      beverage: "Tea",
      isSelected: true,
    },
    {
      id: 2,
      beverage: "Coffee",
      isSelected: true,
    },
    {
      id: 3,
      beverage: "ColdDrink",
      isSelected: true,
    },
  ].sort((a,b)=> a.beverage>b.beverage?1:a.beverage<b.beverage?-1:0));
 
  const [orders, setOrders] = useState([]);
  const [submitOrders, setSubmitOrders] = useState(true);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    id: "",
    category: "",
    flavour: "",
  });



  const handleCurrentCategoryChange = (event) => {
    if (currentOrder?.category) {
      categorys.find(
        ({ beverage }) => beverage === currentOrder.category
      ).isSelected = true;
    }

    categorys.find(
      ({ beverage }) => beverage === event.target.value
    ).isSelected = false;
    setCurrentOrder({
      id: categorys.find(({ beverage }) => beverage === event.target.value).id,
      [event.target.name]: event.target.value,
      flavour: "",
    });
    spyOnSelectChange({
      id: categorys.find(({ beverage }) => beverage === event.target.value).id,
      [event.target.name]: event.target.value,
      flavour: "",
    })
  };

  const handleCurrentFlavourChange = (event) => {
    setCurrentOrder({
      id: currentOrder.id,
      category: currentOrder.category,
      [event.target.name]: event.target.value,
    });
    spyOnSelectChange({
      id: currentOrder.id,
      category: currentOrder.category,
      [event.target.name]: event.target.value,
    })
  };

  const handleChange = (event, i) => {
    let updatedOrders = [...orders];

    if (updatedOrders[i].category.length > 0) {
      setCategory((prev) => [
        ...prev,
        (categorys.find(
          ({ beverage }) => beverage === updatedOrders[i].category
        ).isSelected = true),
      ]);
    }

    updatedOrders[i] = {
      id: categorys.find(({ beverage }) => beverage === event.target.value).id,
      [event.target.name]: event.target.value,
    };

    setCategory((prev) => [
      ...prev,
      (categorys.find(
        ({ id }) => id === updatedOrders[i].id
      ).isSelected = false),
    ]);

    setOrders(updatedOrders);
    spyOnSelectChange(updatedOrders);
  };

  const addFlavour = (event, i) => {
    const newArray = orders.map((item, index) => {
      if (index === i) {
        return { ...item, [event.target.name]: event.target.value };
      } else {
        return item;
      }
    });
    setOrders(newArray);
    spyOnSelectChange(newArray);
  };

  const updateOrders = (event) => {
    if (currentOrder?.category.length <= 0 || currentOrder?.flavour.length<=0) {
      setSnackBarOpen(true);
      spySnackBar(true);
      return;
    }
    if (orders.length > 2) return;
    setOrders((prev) => [
      ...prev,
      {
        id: currentOrder.id,
        category: currentOrder.category,
        flavour: currentOrder.flavour,
      },
    ]);
    setCurrentOrder({ id: "", category: "", flavour: "" });
    spyOnSelectChange([currentOrder])
  };

  const deleteOrders = (event, i) => {
    let updatedOrders = [...orders];

    if (updatedOrders[i].category.length > 1) {
      setCategory((prev) => [
        ...prev,
        (categorys.find(
          ({ beverage }) => beverage === updatedOrders[i].category
        ).isSelected = true),
      ]);
    }
    setOrders(orders.filter((itm, idx) => i !== idx));
    spyOnSelectChange(orders.filter((itm, idx) => i !== idx))
  };

  const closeSnackBar = () => {
    setSnackBarOpen(false);
    spySnackBar(false)
  };

  const submitAllOrders = () => {
    const check = orders.filter((order, idx) => {
      if (order?.category?.length > 0 && order?.flavour?.length > 0) {
        return true;
      } else {
        if (order?.category?.length > 0)
          setCategory((prev) => [
            ...prev,
            (categorys.find(
              ({ beverage }) => order.category === beverage
            ).isSelected = true),
          ]);
        return false;
      }
    });

    if (check.length <= 0) {
      setSnackBarOpen(true);
      spySnackBar(true)
      return;
    }
    setSubmitOrders(!submitOrders);
    setOrders(check);
  };

  const resetOrders = () => {
    window.location.reload();
    spyOnSelectChange([])
  };

  return (
    <div id="drinks" data-testid="drink">
      <div className="d-flex justify-content-center  flex-column">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="drinks-order d-flex align-items-center mt-5 ">
            <div className="d-flex align-items-center justify-content-between">
              <div  className="drinks-selection-space bg-white" key="one">
                <Box>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      data-testid="select-testing"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={currentOrder?.category}
                      label="Category"
                      name="category"
                      onChange={(e) => {
                        handleCurrentCategoryChange(e);
                      }}
                    >
                      {currentOrder?.category?.length > 0 && (
                        <MenuItem
                          value={currentOrder.category}
                          key={currentOrder.id}
                        >
                          {currentOrder.category}
                        </MenuItem>
                      )}

                      {categorys
                        .filter(({ isSelected }) => isSelected === true)
                        .map(
                          (res, i) =>
                            res.isSelected && (
                              <MenuItem value={res.beverage} key={i}>
                                {res.beverage}
                              </MenuItem>
                            )
                        )}
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <div className="bg-white">
                <Box>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      Flavours
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      data-testid="select-flavour"
                      id="demo-simple-select"
                      value={currentOrder?.flavour}
                      name="flavour"
                      label="Flavours"
                      onChange={(e) => handleCurrentFlavourChange(e)}
                    >
                      {currentOrder?.category?.length > 0 &&
                        Object.values(
                          flavours.find(
                            (flavour) => flavour.id === currentOrder?.id
                          )
                        )
                          .slice(1)
                          .map((res, index) => (
                            <MenuItem value={res} key={index}>
                              {res}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
              <button data-testid="order" className="bev-add" onClick={updateOrders}>
                Place Order
              </button>
          </div>
            {orders.map((order, i) => {
              return (
                <div data-testid="ordered" className="drinks-order mt-5 d-flex align-items-center justify-content-center" key={i}>
                  <Orders
                    {...{
                      order,
                      handleChange,
                      categorys,
                      addFlavour,
                      flavours,
                      i,
                    }}
                  />
                  
                    <button
                      data-testid="delete-order"
                      className={`bev-delete ${orders.length<2?"invisible":"visible "}`}
                      onClick={(event) => deleteOrders(event, i)}
                    >
                      Delete Order
                    </button>
                </div>
              );
            })}
        </div>

          {submitOrders && (
            <button data-testid="submit-order" onClick={submitAllOrders} className="handle-submit">
              Submit Orders
            </button>
          )}

          {!submitOrders && (
            <div className="drinks-table mx-auto mt-5 d-flex align-items-center flex-column">
              <OrderTable orders={orders} />
              {!submitOrders && (
                <button data-testid="reset-order" onClick={resetOrders} className="handle-reset">
                  ResetAll Orders 
                </button>
              )}
            </div>
          )}

          {snackBarOpen && (
            <Snackbar
              data-testid="snackbar-testing"
              open={snackBarOpen}
              autoHideDuration={6000}
              sx={{ marginTop: 14 }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={closeSnackBar}
            >
              <Alert
                onClose={closeSnackBar}
                severity="error"
                sx={{ width: "800px" }}
              >
                {orders.length > 2
                  ? "Reached Maximum Orders"
                  : "please add some beverage"}
              </Alert>
            </Snackbar>
          )}
        </div>
    </div>
  );
};

export default Drinks;