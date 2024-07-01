import { StyleSheet } from "react-native";

export const FormStyles = StyleSheet.create({

  Form: {
      backgroundColor: '#fefefe',
      //flex: 1,
      alignItems: "center",
      borderRadius: 10,
      borderColor: '#fafffe',
      borderWidth: 1,
      margin: 12,
  },
  Input: {
      width: '90%',
      padding: 8,
      borderWidth: 1,
      margin: 8,
      borderRadius: 6,
      borderColor: '#D3D3D3',
  },
  FormHeader: {
      color: 'black',
      fontWeight: '800',
      letterSpacing: 10,
      padding:12
  },
  button: {
      backgroundColor: 'green',
      flexDirection: 'row',
      width: '80%',
      padding: 8,
      margin: 12,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
  },
});

export const badge = StyleSheet.create({
  badge : {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  
})



export const searchBarStyles = StyleSheet.create({
    searchInputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: "green",
      borderRadius: 6,
      alignItems: 'center',
      margin: 10,
      padding: 10, // Add horizontal padding for aesthetics
      backgroundColor: '#f5f5f5', // Optional: Set a subtle background for the input area
    },
    searchIcon: {
      marginRight: 10, // Add margin for spacing between icon and input
    },
    searchInput: {
      flex: 1, // Allow the input field to expand as needed
      fontSize: 16,
    },
  });


////APP WRAPPER
export const WrapperStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e0e0e0',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    
  });


  export const productStyles = {
    container: {
      margin: 4,
      borderRadius: 10,
      backgroundColor:"white",
      padding: 12
      
    },

    cardHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      padding: 4,
      alignSelf: "center",
      maxWidth: 200
    },
    cardDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 3
    },
    cardDetailText: {
      fontSize: 18,
      //fontWeight: "bold",
    },
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: 23,
    },
    iconButton: {
      backgroundColor: 'rgba(0, 100,0, 10)',
      borderRadius: 50,
      //margin: 5,
      padding: 6
    },
  };

export const buttonStyles = StyleSheet.create({
  button:{
    backgroundColor: "green",
    padding: 4,
    marginTop: 4,
    marginBottom: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#fefefe"
}
})

export const shopStyles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:"space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    margin: 3,
    padding: 2,
    borderWidth: 1,
    borderColor: "#fefefe",
    backgroundColor: "white",
  },
  details: {
    padding: 6,
    flex: 1,
    margin: 8,
    alignSelf: "center",
    maxWidth: 280,
    borderWidth: 1,
    borderColor: "#fafafe",
    borderRadius: 6
  }
})


export const profileStyles = StyleSheet.create({
  topBar:{
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fefefe",
    backgroundColor: "#fefefe",
    borderRadius: 10,
    padding: 10,
    //margin: 2
  },
  container:{
    flex : 1,
    flexDirection: "column",
    padding: 12,
    height: "100%",
    //margin: 12
  }
})

