import * as React from "react";
import {StyleSheet, View, Image, Pressable, Text} from "react-native";

const TecnicasMeditar = () => {
  	
  	return (
    		<View style={styles.tecnicasMeditar}>
      			<View style={[styles.fundo, styles.menuPosition]} />
      			<View style={[styles.menu, styles.menuPosition]} />
      			<Image style={[styles.apoioIcon, styles.iconLayout2]} resizeMode="cover" source="apoio.png" />
      			<Image style={[styles.perfilIcon, styles.iconLayout2]} resizeMode="cover" source="perfil.png" />
      			<Image style={[styles.avaliacaoIcon, styles.iconPosition1]} resizeMode="cover" source="avaliacao.png" />
      			<Image style={[styles.calmaIcon, styles.calmaIconPosition]} resizeMode="cover" source="calma.png" />
      			<Image style={[styles.diarioIcon, styles.iconPosition1]} resizeMode="cover" source="diario.png" />
      			<Pressable style={[styles.botaoHome, styles.calmaIconPosition]} onPress={()=>{}}>
        				<Image style={styles.iconLayout1} resizeMode="cover" source="botao-home.png" />
      			</Pressable>
      			<Text style={styles.relaxar}>Hora de relaxar</Text>
      			<Image style={[styles.alivioIcon, styles.iconLayout]} resizeMode="cover" source="alivio.png" />
      			<Text style={[styles.alivioStress, styles.minutosText]}>{`alivio
stress
`}</Text>
            <Image style={[styles.minIcon, styles.minIconPosition]} resizeMode="cover" source="15min.png" />
      			<Text style={[styles.meditacao15Minutos, styles.somTypo]}>{`meditacao
      			15
      			minutos`}</Text>
            <Image style={[styles.minIcon1, styles.minIconPosition]} resizeMode="cover" source="10min.png" />
      			<Text style={[styles.meditacao10Minutos, styles.somTypo]}>{`meditacao
      			10
      			minutos`}</Text>
            <Image style={[styles.pazIcon, styles.iconPosition]} resizeMode="cover" source="paz.png" />
      			<Text style={[styles.somPazInterior, styles.somText]}>{`som
      			paz
      			interior`}</Text>
            <Image style={[styles.flautaIcon, styles.iconLayout]} resizeMode="cover" source="flauta.png" />
      			<Text style={[styles.somFlautaTocando, styles.somText]}>{`som
      			flauta
      			tocando
      			`}</Text>
            <Image style={[styles.meditaIcon, styles.iconPosition]} resizeMode="cover" source="medita.png" />
      			<Text style={[styles.meditaIniciante, styles.somText]}>{`Medita
      			iniciante`}</Text>
            <Pressable style={styles.vector} onPress={()=>{}}>
                <Image style={[styles.icon1, styles.iconLayout1]} resizeMode="cover" source="Vector.png" />
            </Pressable>
        </View>);
};

const styles = StyleSheet.create({
    menuPosition: {
        width: 360,
        left: 0,
        position: "absolute"
    },
    iconLayout2: {
        height: 40,
        top: 584,
        width: 40,
        position: "absolute"
    },
    iconPosition1: {
        top: 587,
        position: "absolute"
    },
    calmaIconPosition: {
        top: 585,
        height: 40,
        position: "absolute"
    },
    iconLayout: {
        height: 105,
        width: 140,
        position: "absolute"
    },
    minutosText: {
        opacity: 0,
        textDecoration: "underline",
        textAlign: "center",
        color: "#dbedef",
        position: "absolute"
    },
    minIconPosition: {
        top: 301,
        height: 105,
        width: 140,
        position: "absolute"
    },
    somTypo: {
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        fontSize: 15
    },
    iconPosition: {
        left: 28,
        height: 105,
        width: 140,
        position: "absolute"
    },
    somText: {
        color: "#fff",
        opacity: 0,
        textDecoration: "underline",
        textAlign: "center",
        position: "absolute"
    },
    iconLayout1: {
        height: "100%",
        width: "100%"
    },
    fundo: {
        top: 0,
        backgroundColor: "#41acbb",
        height: 640
    },
    menu: {
        top: 574,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
        elevation: 4,
        shadowOpacity: 1,
        backgroundColor: "#398d98",
        height: 66
    },
    apoioIcon: {
        left: 242
    },
    perfilIcon: {
        left: 301
    },
    avaliacaoIcon: {
        left: 190,
        width: 38,
        height: 38
    },
    calmaIcon: {
        left: 133,
        width: 40,
        top: 585
    },
    diarioIcon: {
        left: 78,
        width: 35,
        height: 37
    },
    botaoHome: {
        left: 20,
        width: 42
    },
    relaxar: {
        top: 87,
        left: 14,
        fontSize: 27,
        width: 332,
        opacity: 0.9,
        height: 69,
        textAlign: "center",
        color: "#dbedef",
        fontFamily: "Urbanist-ExtraBold",
        fontWeight: "800",
        position: "absolute"
    },
    alivioIcon: {
        left: 193,
        top: 156
    },
    alivioStress: {
        top: 171,
        width: 98,
        height: 67,
        fontSize: 32,
        fontFamily: "Urbanist-ExtraBold",
        fontWeight: "800",
        left: 223
    },
    minIcon: {
        left: 27
    },
    meditacao15Minutos: {
        top: 318,
        left: 32,
        width: 125,
        opacity: 0,
        textDecoration: "underline",
        textAlign: "center",
        color: "#dbedef",
        position: "absolute",
        height: 69
    },
    minIcon1: {
        left: 193
    },
    meditacao10Minutos: {
        top: 323,
        left: 222,
        opacity: 0,
        textDecoration: "underline",
        textAlign: "center",
        color: "#dbedef",
        position: "absolute"
    },
    pazIcon: {
        top: 444
    },
    somPazInterior: {
        top: 469,
        left: 67,
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        fontSize: 15
    },
    flautaIcon: {
        left: 194,
        top: 444
    },
    somFlautaTocando: {
        top: 462,
        width: 70,
        height: 68,
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        fontSize: 15,
        left: 223
    },
    meditaIcon: {
        top: 156
    },
    meditaIniciante: {
        top: 170,
        left: 35,
        fontSize: 32,
        fontFamily: "Urbanist-ExtraBold",
        fontWeight: "800"
    },
    icon1: {
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden"
    },
    vector: {
        left: "7.78%",
        top: "5.47%",
        right: "84.72%",
        bottom: "91.56%",
        width: "7.5%",
        height: "2.97%",
        position: "absolute"
    },
    tecnicasMeditar: {
        backgroundColor: "#fff",
        flex: 1,
        overflow: "hidden",
        height: 640,
        width: "100%"
    }
});

export default TecnicasMeditar;
