import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Switch,
    Image,
    Button,
    TouchableOpacity,
    useWindowDimensions
} from 'react-native';
function Blocked() { 
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={{color:'#000', fontSize:16}}>
                    Blocked Users
                    </Text>
                </View>
                <View>
                    <Text style={{paddingVertical:10, fontSize:12, color:"rgba(0, 0, 0, 0.5)"}}>
                        Updates from these users are hidden from you
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor:"#fff",
      padding:10
    },
    input: {
        marginVertical:10,
        borderWidth: 0.3,
        borderColor:"#4955BB",
        color: "black",
        textAlignVertical:"top",
        borderRadius:10,
        padding:15
      },
      button:{
        marginTop:15,
        justifyContent:"center",
        padding:10, 
        backgroundColor:"#4955BB",
        alignItems:'center',
        borderRadius:10
        }
  });
export default Blocked;