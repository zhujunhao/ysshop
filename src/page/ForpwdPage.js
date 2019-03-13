import React,{ Component } from 'react';
import { StyleSheet,ScrollView, Text, View,Image,TouchableOpacity } from 'react-native';
import { WingBlank,Flex,InputItem,List } from '@ant-design/react-native';
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigationBar from '../common/NavigationBar';

class ForgetPwd extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNum: '',
            password1 : '',
            password2 : '',
            checkNum : ''
        }
    }

    static navigationOptions = {
        header:null
    };

    leftButtonPart (imageRoad) {
        return (
            <TouchableOpacity
                onPress = {()=>this.clickPage('back')}
            >
                <Image style={{width:25,height:25,margin:10}}
                    source={imageRoad}
                ></Image>
            </TouchableOpacity>
        )
    }

    clickPage(pageName) {
        if (pageName == "back") {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <NavigationBar leftButton={this.leftButtonPart(require('../../res/common/return.png'))} title={'修改登录密码'}/>
                <ScrollView style={styles.container}>
                    <WingBlank>
                        <Flex direction={"column"} justify={"center"}>

                            <List style={{width:300,marginTop:100}}>
                                <InputItem
                                    style={styles.txtPut}
                                    clear
                                    type="phone"
                                    value={this.state.phoneNum}
                                    onChange={value => {
                                    this.setState({
                                        phoneNum: value,
                                    });
                                    }}
                                    placeholder="请输入绑定的手机号码"
                                >
                                    <Text style={styles.valNameTxt}>手机号码：</Text>
                                </InputItem>
                                <InputItem
                                    clear
                                    style={styles.txtPut}
                                    type="password"
                                    value={this.state.password1}
                                    onChange={value => {
                                    this.setState({
                                        password1: value,
                                    });
                                    }}
                                    placeholder="请输入密码"
                                >
                                    <Text style={styles.valNameTxt}>密码：</Text>
                                </InputItem>
                                <InputItem
                                    clear
                                    style={styles.txtPut}
                                    type="password"
                                    value={this.state.password2}
                                    onChange={value => {
                                    this.setState({
                                        password2: value,
                                    });
                                    }}
                                    placeholder="请再次输入密码"
                                >
                                    <Text style={styles.valNameTxt}>确认密码：</Text>
                                </InputItem>
                                <Flex direction={"row"}>
                                    <InputItem
                                        clear
                                        style={{width:200,fontSize:13}}
                                        type="phone"
                                        value={this.state.checkNum}
                                        onChange={value => {
                                        this.setState({
                                            checkNum: value,
                                        });
                                        }}
                                        placeholder="请输入手机验证码"
                                    >
                                        <Text style={styles.valNameTxt}>验证码：</Text>
                                    </InputItem>
                                    <View style={{width:80,height:30,backgroundColor:'#79d7da',borderRadius:8}}>
                                        <Text style={{lineHeight:30,color:'#fff',fontSize:13,textAlign:"center"}}>发送验证码</Text>
                                    </View>
                                </Flex>
                            </List>
                            <View style={{width:300,height:40,borderRadius:20,backgroundColor:'#79d7da',marginTop:20}}>
                                <Text style={{lineHeight:40,color:'#fff',fontSize:13,textAlign:'center'}}>修改密码</Text>
                            </View>
                        </Flex>
                    </WingBlank>
                </ScrollView>
            </View>
            
        )
    }
}

export default ForgetPwd;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    valNameTxt: {
        fontSize: 13,
        color: "#333"
    },
    txtPut: {
        fontSize: 13,
        color: "#333"
    }
});