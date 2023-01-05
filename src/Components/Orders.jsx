import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Orders = ({order,handleChange,categorys,addFlavour,flavours,i}) => {
  return (
    <div className="d-flex align-items-center">
      <div className="drinks-selection-space bg-white ">
        <Box>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              data-testid="orders-select-category"
              value={order?.category}
              label="Category"
              name="category"
              onChange={(e) => {
                handleChange(e, i);
              }}
            >
              {order?.category?.length > 0 && (
                <MenuItem value={order.category} key={i}>
                  {order.category}
                </MenuItem>
              )}
              {categorys
                .filter(({ beverage }) => beverage !== order.category)
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
            <InputLabel id="demo-simple-select-label">Flavours</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              data-testid="orders-select-flavour"
              id="demo-simple-select"
              value={order?.flavour}
              name="flavour"
              label="Flavours"
              onChange={(e) => addFlavour(e, i)}
            >
              {order.category.length > 0 &&
                Object.values(
                  flavours.find((flavour) => flavour.id === order.id)
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
  );
};

export default Orders;
