

export default (styles = {
  
  modalClose: {
    position: "absolute",
    right: 0,
    padding: 20,
    color: "black",
    zIndex: 1
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.9)"
  },
  screenOverlay: {
        
    flex: 1,
    justifyContent: "center",
    marginTop:'60%',
  },
  centeredBtn: {
    click:'pointer',
    alignSelf: "center",
    width: 150,
    height:62,
    justifyContent: "center",
    borderRadius:10,    
    marginTop:300
  },
  centeredStopBtn: {
    click:'pointer',
    alignSelf: "center",
    width: 200,
    justifyContent: "center",
    borderRadius:100,
    marginTop:-30 
  },
  backgroundVideo: {

    position:"absolute",
    height:100,
    width:100,
    top:-200,
    left:-90
  },
  
});
