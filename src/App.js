import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  Image,
  FlatList,
  Modal,
  Linking,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native-web';
import './App.css';
const boldFamily = 'Arial Black,Arial Bold,Gadget,sans-serif';
const desc = 'Lets put your imagination into code and let that change millions of lives in reality. I belive in code for better world.';
const {
  height,
  width
} = Dimensions.get('window');
const theme = {
  primary : '#D5FF40',
  blk : '#000',
  grey : '#767676',
  light : '#404040',
  silver : '#c7c7c7',
  borderColor : '#242424'
}
const server = 'rathoddeepak.github.io';
const fbIcon = `http://${server}/fb.png`;
const igIcon = `http://${server}/ig.png`;
const tgIcon = `http://${server}/tg.png`;
const twIcon = `http://${server}/tw.png`;
const phoneIcon = `http://${server}/phone.png`;
const wtIcon = `http://${server}/wt.png`;
const meImg = `http://${server}/me.jpg`;

const reactIcon = `http://${server}/react.png`;
const flutterIcon = `http://${server}/flutter.png`;
const goIcon = `http://${server}/golang.png`;
const nodeIcon = `http://${server}/nodejs.png`;
const phpIcon = `http://${server}/php.png`;
const postgresIcon = `http://${server}/postgres.png`;
const jsIcon = `http://${server}/js.png`;
const javaIcon = `http://${server}/java.png`;

const photoIcon = `http://${server}/ss.png`;
const closeIcon = `http://${server}/close.png`;
const storeIcon = `http://${server}/store.png`;
const workCall  = 'https://raw.githubusercontent.com/rathoddeepak/rathoddeepak.github.io/main/exp.json';
export default class App extends Component {
  render () {
    return (
      <Mobile />
    )
  }
}

class Mobile extends Component {
  constructor(props){
    super(props)
    this.state = {
      tabs : [
       {
        name : 'ME'
       },
       {
        name : 'WORK'
       },
       {
        name : `Let's Talk`
       }
      ],
      name : 'Deepak Rathod.',
      currentTab : 0
    }
  }
  render () {
    const {
      tabs,      
      currentTab,
      tabValue
    } = this.state;
    var backgroundColor = currentTab == 0 ? theme.primary : theme.blk;
    return (
      <View style={[s.mobile.main, {backgroundColor}]}><View style={s.mobile.content}>
       {this.renderContent(currentTab)}
      </View>
      <View style={s.mobile.footer}>
        {tabs.map(this.renderTab)}
       </View>
       <LetsTalk ref={ref => this.lTalk = ref} />
      </View>
    )
  }
  renderTab = (tab, index) => {
    const active = this.state.currentTab;
    const color = active == index ? theme.primary : theme.grey;
    return (
      <TouchableOpacity style={s.mobile.tab} key={tab.name} onPress={() => this.changeTab(index)}>
        <Text className="bold" style={[s.mobile.txt, {color}]}>{tab.name}</Text>
      </TouchableOpacity>
    )
  }

  renderContent = (tab) => {
    if(tab == 0){
      return this.meContent();
    }else if(tab == 1){
      return <Work />
    }
  }
  meContent = () => {
    const {
      name,
    } = this.state;
    return (
      <>
      <Text style={s.mobile.myName}>{name}</Text>       
       <Text style={s.mobile.dots}>••</Text>
       <Text style={s.mobile.title}>{'DIGITIZE\nIDEAS'}</Text>       
       <Text style={s.mobile.desc}>{desc}</Text>
       <View style={s.mobile.row}>
        <View style={s.mobile.box}>
         <Image source={meImg} style={{flex : 1}} />
        </View>
        <View style={s.mobile.data}>
         <Text style={s.mobile.expertize}>My Expertize</Text>
         <Text style={s.mobile.detail}>Full Stack Developer</Text>
         <View style={s.mobile.line} />
         <Text style={s.mobile.detail}>Software System Design</Text>
        </View>
       </View>
       <View style={s.visit.main}>
         <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom : 10,marginTop:5}}>
          <Image style={s.tech} source={reactIcon} />
          <Image style={s.tech} source={flutterIcon} />
          <Image style={s.tech} source={jsIcon} />
          <Image style={s.tech} source={javaIcon} />
          <Image style={s.tech} source={nodeIcon} />
          <Image style={s.tech} source={goIcon} />
          <Image style={s.tech} source={postgresIcon} />
         </View>

         <TouchableOpacity onPress={() => this.ol('bit.ly/deepakrathod')} style={s.visit.row}>
           <View style={s.visit.icon}>
            <Image source={fbIcon} style={s.visit.img} />
           </View>
           <Text style={s.visit.link}>bit.ly/deepakrathod</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => this.ol('instagram.com/_deepak.rathod_')} style={s.visit.row}>
           <View style={s.visit.icon}>
            <Image source={igIcon} style={s.visit.img} />
           </View>
           <Text style={s.visit.link}>instagram.com/_deepak.rathod_</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => this.ol('twitter.com/_deepakrathod_')} style={s.visit.row}>
           <View style={s.visit.icon}>
            <Image source={twIcon} style={s.visit.img} />
           </View>
           <Text style={s.visit.link}>twitter.com/_deepakrathod_</Text>
         </TouchableOpacity>

        </View>
      </>
    )
  }

  changeTab = (currentTab) => {
    if(currentTab == 2){
      this.lTalk.show();
      return
    }
    this.setState({currentTab})
  }

  ol = (link) => {
    Linking.openURL('https://' + link)
  }

}
class Work extends Component {
  constructor(props){
    super(props)
    this.state = {
      works : [],
      loading : false,
      error : false
    }
  }
  render () {
    const {
      works
    } = this.state;
    return (
      <>
       <View style={{backgroundColor : theme.blk}}>
       <Text style={s.work.title}>My Works</Text>
       <Text style={s.work.desc}>action speaks more than words</Text>
       </View>
       {this.renderIndicator()}
       <FlatList
        data={works}
        ListFooterComponent={() => <View style={{height : 50}} />}
        renderItem={this.renderWork}
       />
       <PhotoViewer ref={ref => this.viewer = ref} />
      </>
    )
  }
  renderWork = ({item, index}) => {
    return (
      <View style={s.wcard.main}>
       <View style={s.wcard.row}>
        <Image source={item.image} style={s.wcard.img}/>
        <View style={s.wcard.content}>
         <Text style={s.wcard.title}>{item.name}</Text>
         <Text style={s.wcard.desc}>{item.desc}</Text>
        </View>
       </View>
       <Text style={s.wcard.about}>{item.about}</Text>

       <View style={s.wcard.techRow}>
        {item?.tags?.map((t) => <Text style={s.wcard.tech}>{t}</Text>)}
       </View>

       <View style={s.wcard.row2}>
        
        <TouchableOpacity onPress={() => this.viewer.show(item?.photos)} style={s.wcard.section}>
         <Image style={s.wcard.icon} source={photoIcon} />
         <Text style={s.wcard.secTxt}>Photos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.wcard.section} onPress={() => this.openLink(item.storeLink)}>
         <Image style={s.wcard.icon} source={storeIcon} />
         <Text style={s.wcard.secTxt}>Playstore</Text>
        </TouchableOpacity>

       </View>

       <View style={s.wcard.dateBox}>
        <Text style={s.wcard.date}>{item.from_year} - {item.to_year}</Text>
       </View>
      </View>
    )
  }

  renderIndicator = () => {
    const {loading, error} = this.state;
    if(loading == false && error == false){
      return null
    }else if(error == true){
      return <View style={s.inc.main}>
       <Text onPress={this.loadData} style={s.inc.txt}>Please Try Again!</Text>
      </View>
    }else if(loading == true){
      return <View style={s.inc.main}>
        <ActivityIndicator size={30} color={theme.primary} />
      </View>
    }
  }

  componentDidMount () {
    this.loadData();
  }

  loadData = async () => {
    if(this.state.works.length > 0)return
    this.setState({loading:true,error:false})
    fetch(workCall).then(data => data.json()).then((works) => {
      this.setState({loading:false,error:false, works})
    }).catch(err => {
      this.setState({loading:false,error:true})
    })
  }

  openLink = (link) => {
    if(link == undefined){
      return
    }
    Linking.openURL(link)
  }
}

class LetsTalk extends Component {
  constructor(props){
    super(props)
    this.state = {
      v : false
    }
  }
  show = () => {
    this.setState({
      v : true
    })
  }
  close = () => {
    this.setState({
      v : false
    })
  }

  callMe = () => {
    Linking.openURL('tel: +91 7020814070')
  }

  waMe = () => {
    Linking.openURL('https://wa.me/917020814070')
  }

  tgMe = () => {
    Linking.openURL('https://t.me/deepakrathod537')
  }
  
  
  render () {
    const {
      v
    } = this.state;
    return (
      <Modal onRequestClose={this.close} visible={v} transparent animationType="fade"><View style={s.lTalk.main}>
      <View style={s.lTalk.content}>
       <View style={s.lTalk.header}>
        <Text style={s.lTalk.headerTxt}>Waiting for your call...</Text>
       </View>


       <TouchableOpacity onPress={this.callMe} style={s.lTalk.row}> 
        <View style={s.lTalk.icon}>
         <Image source={phoneIcon} style={s.lTalk.img} />
        </View>
        <Text style={s.lTalk.txt}>Call Me</Text>
       </TouchableOpacity>

       <TouchableOpacity onPress={this.waMe} style={s.lTalk.row}> 
        <View style={s.lTalk.icon}>
         <Image source={wtIcon} style={s.lTalk.img} />
        </View>
        <Text style={s.lTalk.txt}>Whatsapp Me</Text>
       </TouchableOpacity>

       <TouchableOpacity onPress={this.tgMe} style={[s.lTalk.row, {borderBottomWidth : 0}]}> 
        <View style={s.lTalk.icon}>
         <Image source={tgIcon} style={s.lTalk.img} />
        </View>
        <Text style={s.lTalk.txt}>Telegram Me</Text>
       </TouchableOpacity>

       <TouchableOpacity onPress={this.close} style={s.lTalk.close}>
        <Image source={closeIcon} style={s.lTalk.img} />
       </TouchableOpacity>

      </View>
      </View></Modal>
    )
  }
}

class PhotoViewer extends Component {
  constructor(props){
    super(props)
    this.state = {
      v : false,
      activeIndex:0,
      list : []
    }
  }
  
  show = (list) => {
    if(list == undefined)return;
    this.setState({
      v : true,
      list,
      activeIndex: 0
    })
  }

  close = () => {
    this.setState({
      v : false,
      list : [],
      activeIndex : 0
    })
  }
  
  
  render () {
    const {
      v,
      list,
      activeIndex
    } = this.state;
    const image = list[activeIndex];
    return (
      <Modal onRequestClose={this.close} visible={v} transparent animationType="fade"><View style={s.lTalk.main}>
       <View style={s.pv.close}>
        <TouchableOpacity onPress={this.close} style={s.lTalk.close}>
          <Image source={closeIcon} style={s.lTalk.img} />
        </TouchableOpacity>
       </View>
       <View style={s.pv.main}>
        <Image
         style={s.pv.image}
         source={image}
         resizeMode="contain"
        />
       </View>
       <ScrollView horizontal><View style={s.pv.footer}>
        {list.map(this.renderList)}
       </View></ScrollView>
      </View></Modal>
    )
  }
  renderList = (image, index) => {
    const activeIndex = this.state.activeIndex;
    return (
      <TouchableOpacity onPress={() => this.setState({activeIndex:index})} style={[s.pv.box, {borderWidth : index == activeIndex ? 2 : 0 }]}>
       <Image
        source={image}
        style={s.pv.img}
       />
      </TouchableOpacity>
    )
  }
}
const s = {
  pv : {
    close : {height : 50,justifyContent:'center',width : '100%'},
    main : {
      height : height - 110,
      width
    },
    image : {
      width,
      height : height - 110,
      backgroundColor : theme.light
    },
    footer : {
      width : '100%',
      height : 60,
      flexDirection : 'row'
    },
    box : {
      width : 60,
      height : 60,
      borderColor : theme.silver,
      marginRight : 7,
      justifyContent : 'center',
      alignItems : 'center'
    },
    img : {
      width : 55,
      height : 55,
    }
  },
  inc : {
    main : {
      height : 200,
      width : '100%',
      justifyContent : 'center',
      alignItems : 'center'
    },
    txt : {
      fontSize : 17,
      color : theme.primary,
      fontWeight : 'bold'
    }
  },
  lTalk : {
    close : {
      position : 'absolute',
      top : 0,
      right : 0,
      width : 50,
      height : 50,
      justifyContent : 'center',
      alignItems : 'center'
    },
    row : {
      height : 50,
      alignItems : 'center',
      flexDirection : 'row',
      paddingLeft : 10,
      borderBottomWidth : 1,
      borderColor : theme.borderColor
    },
    icon : {
      width : 50,
      height : 50,
      justifyContent : 'center',
      alignItems : 'center'
    },
    img : {
      width : 25,
      height : 25,
      tintColor : theme.silver
    },
    txt : {
      fontWeight : 'bold',
      color : theme.silver,
      fontSize : 16,
      marginLeft : 10
    },
    main : {
      height,
      width,
      justifyContent : 'center',
      alignItems : 'center',
      backgroundColor : '#000000b4'
    },
    content : {
      width : '95%',
      borderRadius : 10,
      backgroundColor : '#151515'
    },
    header : {
      height : 50,
      justifyContent : 'center',
      paddingLeft : 10,
      borderBottomWidth : 1,
      borderColor : theme.borderColor
    },
    headerTxt : {
      fontSize : 18,
      color : theme.silver,
      fontWeight : 'bold'
    }
  },
  wcard : {
    techRow : {
      flexDirection : 'row',
      flexWrap : 'wrap',
      marginTop : 5,
    },
    tech : {
      paddingVertical : 4,
      paddingHorizontal : 10,
      borderRadius : 10,
      backgroundColor : theme.light,
      fontSize : 14,
      fontWeight : 'bold',
      color : theme.silver,
      marginRight : 6,
      marginBottom : 3
    },
    section : {
      flexDirection : 'row',
      alignItems : 'center',
    },
    icon : {
      width : 14,
      height : 14,
    },
    secTxt : {
      color : theme.silver,
      fontSize : 14,
      fontWeight : 'bold',
      paddingLeft : 5,
      marginRight : 10
    },
    main : {
      width : '100%',
      borderWidth : 2,
      borderRadius : 10,
      marginVertical : 10,
      padding : 5,
      borderColor : theme.borderColor
    },
    row : {
      flexDirection : 'row',
      justifyContent : 'space-between',
    },
    row2 : {
      flexDirection : 'row',
      paddingLeft : 3,
      marginTop : 10 
    },
    img : {
      height : 90,
      width : 90,
      borderRadius : 10,
      backgroundColor : theme.light
    },
    title : {
      color : theme.silver,
      fontSize : 16,
      fontWeight : 'bold',
      width : '60%',
      paddingLeft : 10
    },
    desc : {
      color : theme.light,
      fontSize : 13,
      width : '60%',
      marginTop : 5,
      paddingLeft : 10
    },
    about : {
      color : theme.silver,
      fontSize : 14,
      width : '100%',
      marginTop : 5,
      paddingLeft : 5
    },
    dateBox : {
      height : 25,
      backgroundColor : theme.borderColor,
      width : 100,
      position : 'absolute',
      right : 0,
      bottom : 0,
      justifyContent : 'center',
      alignItems : 'center',
      borderTopLeftRadius : 10,
      borderBottomRightRadius : 7,
    },
    date : {
      fontSize : 11,
      color : theme.silver,
      fontWeight : 'bold'
    }
  },
  work : {
    title : {
      fontSize : 23,
      color : theme.primary,
      fontWeight : 1000,
      fontFamily : boldFamily,
    },
    desc : {
      fontSize : 16,
      marginTop : 5,
      color : theme.primary,
    }
  },
  tech : {
    width : 23,
    height : 23,
    tintColor : theme.primary
  },
  visit : {
    main : {
      width : '90%',
      backgroundColor : theme.blk,
      borderBottomLeftRadius : 20,
      borderBottomRightRadius : 20,
      paddingVertical : 10
    },
    row : {
      flexDirection : 'row',
      marginBottom : 5,
      marginTop : 5,
      alignItems : 'center'
    },
    icon : {
      width : 50,
      height : 30,
      justifyContent : 'center',
      alignItems : 'center',    
    },
    img : {
      width : 25,
      height : 25,
      tintColor : theme.primary
    },
    link : {
      fontSize : 15,
      color : theme.primary,
      fontWeight : 1000,
      fontFamily : boldFamily,
    }
  },
  mobile : {
    expertize : {
      fontWeight : 1000,
      marginBottom : 10,
      fontFamily : boldFamily,
      color : theme.blk,
      fontSize : 15,
      top : 5
    },
    detail : {
      fontWeight : 1000,
      fontFamily : boldFamily,
      color : theme.blk,
      fontSize : 20,      
    },
    line : {
      width : '100%',
      height : 1,
      marginTop : 5,
      marginBottom : 5,
      backgroundColor : theme.blk
    },
    row : {
      flexDirection : 'row',
      marginTop : 15
    },
    data : {
      paddingLeft : 5,      
    },
    box : {
      width : 100,
      height : 100,
      borderTopLeftRadius : 10,
      borderTopRightRadius : 10,
      backgroundColor : theme.blk,
      overflow: 'hidden'
    },
    desc : {
      fontSize : 16,
      marginTop : 7,
      fontWeight : '400',      
    },
    dots : {
      fontSize :65,
      fontWeight : 'bold',
      lineHeight : 5,
      marginLeft : -2,
      color : theme.blk,
    },
    title : {
      fontSize :50,    
      color : theme.blk,
      fontWeight : 1000,
      fontFamily : boldFamily
    },
    content : {
      width : '95%',
      height,
      paddingTop: 10,
      paddingBottom : 10,
      alignSelf : 'center'
    },
    myName : {
      fontWeight : 'bold',
      color : theme.blk,
      fontSize : 22,
      marginBottom : 35
    },
    main : {
      height,
      width,      
      transition: "all .5s ease",
      WebkitTransition: "all .5s ease",
      MozTransition: "all .5s ease"
    },
    footer : {
      height : 50,
      flexDirection : 'row',
      position : 'absolute',
      bottom : 0,
      width : width,
      justifyContent : 'space-around',
      backgroundColor : theme.blk
    },
    tab : {
      width : '32%',
      height : 50,
      justifyContent : 'center',
      alignItems : 'center',      
    },
    txt : {
      fontSize : 20,
      fontWeight : 1000,
      fontFamily : boldFamily,
    },
    activeBar : {
      width : '100%',
      height : 5,
      backgroundColor : theme.primary,
      borderTopLeftRadius : 10,
      borderTopRightRadius : 10,
      position : 'absolute',
      bottom : 0
    }
  }
}