import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  status: "",
};

export const getDataAsync = createAsyncThunk("data/getData", async (URL) => {
  const response = await fetch(URL);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error("Something went wrong");
});

export const deleteDataAsync = createAsyncThunk(
  "data/deleteData",
  async ({ URL, id }) => {
    const response = await fetch(`${URL}/${id}`, { method: "DELETE" });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Something went wrong");
  }
);

export const addDataAsync = createAsyncThunk(
  "data/addDataAsync",
  async ({ URL, addedData }) => {
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(addedData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("REQUEST ERROR !!!");
  }
);

export const editDataAsync = createAsyncThunk(
  "data/editDataAsync",
  async ({ URL, changedData }) => {
    console.log(changedData.id, "fesdjyhg");
    const response = await fetch(`${URL}/${changedData.id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(changedData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }
);

const setErr = (state) => {
  state.status = "rejected";
  state.loading = false;
};

const pending = (state) => {
  state.status = "loading";
  state.loading = true;
};

const mainSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    sort(state) {
      state.data = state.data.sort((a, b) => {
        if (a.name > b.name) return 1;
        else return -1;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.pending, pending)
      .addCase(getDataAsync.fulfilled, (state, action) => {
        state.status = "resolved";
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDataAsync.rejected, setErr)
      .addCase(deleteDataAsync.pending, pending)
      .addCase(deleteDataAsync.fulfilled, (state, action) => {
        state.status = "resolved";
        state.loading = false;
        state.data = state.data.filter((item) => item.id !== action.payload.id);
      })
      .addCase(deleteDataAsync.rejected, setErr)
      .addCase(addDataAsync.pending, pending)
      .addCase(addDataAsync.fulfilled, (state, action) => {
        state.status = "resolved";
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addDataAsync.rejected, setErr)
      .addCase(editDataAsync.pending, pending)
      .addCase(editDataAsync.fulfilled, (state, action) => {
        state.status = "resolved";
        state.loading = false;
        state.data = state.data.map((item) => {
          if (item.id === action.payload.id) {
            item.name = action.payload.name || item.name;
            item.country = action.payload.country || item.country;
            item.address = action.payload.address || item.address;
          }
          return item;
        });
      })
      .addCase(editDataAsync.rejected, setErr);
  },
});

export const { sort, filter } = mainSlice.actions;
export default mainSlice.reducer;
