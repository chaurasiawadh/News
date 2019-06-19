import React, {Component} from 'react';
import {StyleSheet, 
        Text,
        View,
        FlatList,
        Image,
        TouchableOpacity,
        ActivityIndicator
        } from 'react-native';


//const URI = "https://jsonplaceholder.typicode.com/"
const URI = "https://newsapi.org/v2/everything?q=bitcoin&from=2019-05-19&sortBy=publishedAt&apiKey=c3dfab6bb0654a969865cef2e56343cc"
comment = "comments",
post = "posts"

export default class App extends Component{
    static navigationOptions = {
      title: 'Details',
    };
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          dataSource:[]
         };
       }
       componentDidMount(){
       fetch(URI)
       .then(response => response.json())
       .then((responseJson)=> {
         this.setState({
          loading: false,
          dataSource: responseJson.articles
         })
       })
       .catch(error=>console.log(error))
       }

    FlatListItemSeparator = () => {
        return (
          <View style={{
             height: .5,
             width:"100%",
             backgroundColor:"rgba(0,0,0,0.5)",
        }}
        />
        );
        }

    renderItem=(data)=>
        <View style={styles.list}>
            <Text style={styles.titles}>{data.item.title}</Text>
            <View style={{flexDirection:"row", marginLeft:5}}>
              <View style={{flexDirection:"row", width:"50%"}}>
                <Text style={styles.auth}>Author : </Text>
              <Text style={styles.auth}>{data.item.author}</Text>
              </View>
              <View style={{width:"50%"}}>
                <Text style={styles.time}>{data.item.publishedAt}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate("Git", 
                  {url:"https://github.com/Awadhesh786/ReactNativeExample/blob/master/src/screen/Texts.js"})}
           
              >
            <Image 
            style={{height:200,width:"100%"}}
            source={{uri:data.item.urlToImage}} />
            </TouchableOpacity>
            <Text style={styles.desc}>{data.item.description}</Text>
            {/* <Text>{data.item.content}</Text> */}
        </View>
    
    render(){
        if(this.state.loading){
         return( 
           <View style={styles.loader}> 
             <ActivityIndicator size="large" color="#0c9"/>
           </View>
       )}

    return(
        <View style={styles.container}>
            <FlatList
                data= {this.state.dataSource}
                ItemSeparatorComponent = {this.FlatListItemSeparator}
                renderItem= {item=> this.renderItem(item)}
                keyExtractor= {item=>item.source.name.toString()}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffe"
     },
     titles:{
      fontSize:20,
      fontWeight:"bold",
      marginLeft:4
     },
    loader:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
     },
    list:{
      marginLeft:0,
      marginRight:0,
      marginTop:5,
      backgroundColor: "#ffd",
      elevation:10
     },
     lightText: {
         fontSize:20,
         marginLeft:10
     },
     time:{
       fontSize:10,
       textAlign: "right",
       marginRight:10
       //flex:1,
     },
     auth:{
       fontSize:12,
       marginLeft:2
       
     },
     desc:{
       margin:4
     }
     
  });
