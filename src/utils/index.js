'use client';
import { useEffect, useState } from "react";

export const areArraysEqual = (array1, array2) => {
  if (array1?.length !== array2?.length) return false;
  if (array1?.length === 0 || array2?.length === 0) return false;

  // Sort and compare arrays
  const sortedArray1 = array1.slice().sort((a, b) => a.localeCompare(b));
  const sortedArray2 = array2.slice().sort((a, b) => a.localeCompare(b));

  return sortedArray1.every((value, index) => value === sortedArray2[index]);
}

export const isItemChecked = (data, item) => {
  return data.includes(item);
}

export const truncateStr = (str, value) => {
  if(str?.length <= value || typeof str === 'number' || typeof str !== "string") return str;
  return str?.slice(0, value) + "...";
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatDate = (dateStr, fullYear = false) => {
  const date = new Date(dateStr);

  // Using toLocaleDateString for a localized format
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('fr-FR', options);

  const year = date.getFullYear();

  if(fullYear) return year;
  
  return formattedDate;
}

export const formatInputDate = (dateStr) => {
  const date = new Date(dateStr);

  // Extracting year, month, and day from the date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  // Returning the date in the "yyyy-MM-dd" format
  return `${year}-${month}-${day}`;
}

export const areObjValuesValid = (obj) => { 
  for (const key in obj) { 
    if (obj[key] === '' || obj[key] === undefined) { 
      return false; 
    } 
  } 
  return true; 
}

// export const RenderErrorMsg = ({ err, touched }) => {
//   const [renderedError, setRenderedError] = useState(null);

//   useEffect(() => {
//     if (!err && !touched) {
//       setRenderedError(null);
//     } else if (err && touched) {
//       setRenderedError(<ErrorMessage>{err}</ErrorMessage>);
//     }
//   }, [err, touched]);

//   return renderedError;
// };

export const getSidebarMenu = (userRole, sidebarMenuBase) => {
  return sidebarMenuBase.filter(menuItem => {
    if (userRole === 'user') {
      return menuItem.id !== 4 && menuItem.id !== 5;
    }
    return true; 
  });
};

export const transformedData = (data, labels) => {
  // Handle null/undefined input
  if (!data || typeof data !== 'object') {
    return [];
  }
  return Object.entries(data)
    .filter(([key]) => key in labels) // Only process keys defined in labels
    .map(([key, value]) => ({
      name: labels[key],
      value
    }));
};

export const leaveTypeAarray = [
  { key: "vacation", value: "Vacances" },
  { key: "sick", value: "Congé maladie" },
  { key: "unpaid", value: "Congé non payé" },
  { key: "other", value: "Autre" },
];

export const leaveStatusArray = [
  { key: "pending", value: "En attente" },
  { key: "approved", value: "Approuvé" },
  { key: "rejected", value: "Rejeté" },
  { key: "cancelled", value: "Annulé" },
];

export const employmentStatusArray = [
  { key: "active", value: "En activité" },
  { key: "on_leave", value: "En congé" },
  { key: "terminated", value: "Contrat terminé" },
];

export const returnStringifiedValue = (type, arr) => {
  let value;
  for (const item of arr) {
    if(item.key === type) {
      value = item.value;
      break;
    }
  }
  return value;
}