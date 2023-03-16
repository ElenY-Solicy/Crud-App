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
  async ({ URL, item }) => {
    const response = await fetch(`${URL}/:${item.id}`, { method: "DELETE" });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Something went wrong");
  }
);

export const addDataAsync = createAsyncThunk(
  "data/addData",
  async ({ URL, item }) => {
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
      body: JSON.stringify(item),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("REQUEST ERROR !!!");
  }
);

export const editDataAsync = createAsyncThunk(
  "data/editData",
  async ({ URL, item }) => {
    const response = await fetch(`${URL}/:${item.id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(item),
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
  reducers: {},
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
      .addCase(addDataAsync.fulfilled, (state) => {
        state.status = "resolved";
        state.loading = false;
        state.data.push({
            // data
        });
      })
      .addCase(addDataAsync.rejected, setErr)
      .addCase(editDataAsync.pending, pending)
      .addCase(editDataAsync.fulfilled, (state, action) => {
        state.status = "resolved"
        state.loading = false
        state.data = state.data.map(item => {
          if (item.id === action.payload.id) {
        //    data
          }
          return item
        })
      })
      .addCase(editDataAsync.rejected, setErr)
  },
});

export const {} = mainSlice.actions;
export default mainSlice.reducer;
