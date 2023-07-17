export const userColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
    renderCell: (params) => {
      return (
        <div>{params.row?._id}</div>
      )
    }
  },
  {
    field: "username",
    headerName: "Username",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          {params.row?.username}
        </div>
      );
    },
  },
  {
    field: "role",
    headerName: "Role",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          {params.row?.role}
        </div>
      )
    },
  },
  {
    field: "more_detail",
    headerName: "Detail",
    width: 250,
    renderCell: (params) => {
      return (
        <div>
          {params.row?.more_detail}
        </div>
      )
    },
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 100,
  //   renderCell: (params) => {
  //     const result = params.row.status;
  //     const color = result === 'active' ? 'green' : result === 'pending' ? 'goldenrod' : 'crimson';
  //     return (
  //       <div className="cellWithStatus">
  //         <p style={{ color: color}}>{params.row.status}</p>
  //       </div>
  //     )
  //   }
  // },
];

export const roomColumns = [
  {
    field: "id",
    headerName: "ID", 
    width: 70
  },
  {
    field: "destination",
    headerName: "Destination",
    width: 150,
  },
  {
    field: "roomId",
    headerName: "Room ID",
    width: 100,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    renderCell: (params) => {
      return (
        <div>
          ${params.row.price}
        </div>
      )
    }
  },
  {
    field: "otherInfo",
    headerName: "Other Information",
    width: 230,
  },
];

export const serviceColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "cost",
    headerName: "Cost",
    width: 120,
    renderCell: (params) => {
      return (
        <div>
          ${params.row.cost}
        </div>
      )
    }
  },
  {
    field: "detail",
    headerName: "More detail",
    width: 350,
  },
]