import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { baseApiSlice } from "./baseApiSlice";
import globalReducer from "./globalSlice";
import authReducer from "./features/auth/authSlice";

// import employeesReducer from "../employees/store/employeesSlice";
// import employeesFormReducer from "../employees/store/employeesFormSlice";
// import profilesReducer from "../profiles/store/profilesSlice";
// import usersReducer from "../users/store/usersSlice";
// import projectsReducer from '../projects/store/projectsSlice';
// import indicatorsReducer from '../projects/store/indicatorsSlice';
// import mapFiltersReducer from '../projects/store/mapFiltersSlice';
// import tasksReducer from '../projects/store/tasksSlice';

export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    auth: authReducer,
    global: globalReducer,
    // users: usersReducer,
    // employees: employeesReducer,
    // employeesForm: employeesFormReducer,
    // profileData: profileDataReducer,
    // profiles: profilesReducer,
    // departments: departmentsReducer,
    // domains: domainsReducer,
    // leaves: leavesReducer,
    // projectsData: projectsDataReducer,
    // projects: projectsReducer,
    // indicators: indicatorsReducer,
    // mapFilters: mapFiltersReducer,
    // tasks: tasksReducer,
    
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }).concat(baseApiSlice.middleware)
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

setupListeners(store.dispatch);
