import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomModal from "../../../../components/custom-modal/CustomModal";
import { useSelector, useDispatch } from 'react-redux'
import authApi from "../../../../api/authApi";
import { getAllManager } from "../../../../redux/userSlice";

const DataTable = ({ columns, title, name }) => {
  const dispatch = useDispatch();
  const { managers } = useSelector(state => state.manager); 
  const [listUser, setListUser] = useState([]);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    setListUser([...managers]);
  }, [managers])

  const handleDelete = async (id) => {
    await authApi.delete(id);
    alert('Delete manager successfully!');
    dispatch(getAllManager());
    setOpenConfirmDelete(false);
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/users/edit/${params.row?._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => { setOpenConfirmDelete(true);  setItem(params.row?._id)}}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // const userRows = [
  //   { id: 1, user: 'Snow', email: 'min@gmail.com', age: 35, phone: '0245124155', status: 'active' },
  //   { id: 2, user: 'Snow', email: 'min@gmail.com', age: 35, phone: '0245124155', status: 'pending' },
  //   { id: 3, user: 'Snow', email: 'min@gmail.com', age: 35, phone: '0245124155', status: 'active' },
  //   { id: 4, user: 'Snow', email: 'min@gmail.com', age: 35, phone: '0245124155', status: 'active' },
  //   { id: 5, user: 'Snow', email: 'min@gmail.com', age: 35, phone: '0245124155', status: 'passive' },
  // ];

  // const homestayRows = [
  //   {id: 1, destination: "HaNoi", roomId: 111, type: "Hotels", maxPeople: 5, price: 30, otherInfo: "Swimming pool"},
  //   {id: 2, destination: "TP.HCM", roomId: 245, type: "Villas", maxPeople: 10, price: 100, otherInfo: "Swimming pool"},
  //   {id: 3, destination: "HaNoi", roomId: 105, type: "Apartment", maxPeople: 3, price: 80, otherInfo: "Swimming pool"},
  //   {id: 4, destination: "DaNang", roomId: 142, type: "Hotels", maxPeople: 5, price: 30, otherInfo: "Swimming pool"},
  //   {id: 5, destination: "HaNoi", roomId: 210, type: "Hotels", maxPeople: 5, price: 30, otherInfo: "Swimming pool"},
  //   {id: 6, destination: "HaNoi", roomId: 121, type: "Hotels", maxPeople: 5, price: 30, otherInfo: "Swimming pool"},
  // ]

  // const serviceRows = [
  //   {id: 1, name: "Meal", cost: 5, detail: "hot dogs, crab,..."},
  //   {id: 2, name: "Taxi airpot", cost: 7, detail: "hot dogs, crab,..."},
  //   {id: 3, name: "Rent motobike", cost: 9, detail: "hot dogs, crab,..."},
  //   {id: 4, name: "Barbecue", cost: 12, detail: "hot dogs, crab,..."},
  //   {id: 5, name: "Barbecue", cost: 11, detail: "hot dogs, crab,..."},
  // ]

  return (
    <div className="data-table">
      <div className="data-table__title">
        <span>{title}</span>
        <Link
          to={`${name === 'user' ? '/admin/users/new-user' : ''}`}
          className="data-table__title-link"
        >
          Add New {name}
        </Link>
      </div>
      <DataGrid
        className="data-table__grid"
        rows={name === 'user' ? listUser : []}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />
      <div>
        {openConfirmDelete && (
          <CustomModal
            open={openConfirmDelete}
            content={
              <Typography variant='body1' component='div'>Do you want to delete this {name}?</Typography>
            }
            actions={
              <Box width='100%' ml={2} mr={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                  variant='contained'
                  size='small'
                  sx={{ marginRight: '1rem' }}
                  onClick={() => handleDelete(item)}
                >
                  yes
                </Button>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => setOpenConfirmDelete(false)}
                >
                  no
                </Button>
              </Box>
            }
          />
        )}
      </div>
    </div>
  );
};

export default DataTable;
