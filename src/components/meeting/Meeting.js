import React from 'react';

function Meeting(props) {
    switch (props.value.province) {
        case 'albacete':
            props.value.province = "Albacete";
            break;
        case 'alicante':
            props.value.province = "Alicante";
            break;
        case 'almeria':
            props.value.province = "Almería";
            break;
        case 'alava':
            props.value.province = "Álava";
            break;
        case 'asturias':
            props.value.province = "Asturias";
            break;
        case 'avila':
            props.value.province = "Ávila";
            break;
        case 'badajoz':
            props.value.province = "Badajoz";
            break;
        case 'islasbaleares':
            props.value.province = "Baleares";
            break;
        case 'barcelona':
            props.value.province = "Barcelona";
            break;
        case 'vizcaya':
            props.value.province = "Vizcaya";
            break;
        case 'burgos':
            props.value.province = "Burgos";
            break;
        case 'caceres':
            props.value.province = "Cáceres";
            break;
        case 'cadiz':
            props.value.province = "Cádiz";
            break;
        case 'cantabria':
            props.value.province = "Cantabria";
            break;
        case 'castellon':
            props.value.province = "Castellón";
            break;
        case 'ciudadreal':
            props.value.province = "Ciudad Real";
            break;
        case 'cordoba':
            props.value.province = "Córdoba";
            break;
        case 'acorunya':
            props.value.province = "La Coruña";
            break;
        case 'cuenca':
            props.value.province = "Cuenca";
            break;
        case 'guipuzcoa':
            props.value.province = "Guipúzcoa";
            break;
        case 'girona':
            props.value.province = "Gerona";
            break;
        case 'granada':
            props.value.province = "Granada";
            break;
        case 'guadalajara':
            props.value.province = "Guadalajara";
            break;
        case 'huelva':
            props.value.province = "Huelva";
            break;
        case 'huesca':
            props.value.province = "Huesca";
            break;
        case 'jaen':
            props.value.province = "Jaén";
            break;
        case 'leon':
            props.value.province = "León";
            break;
        case 'lerida':
            props.value.province = "Lérida";
            break;
        case 'lugo':
            props.value.province = "Lugo";
            break;
        case 'madrid':
            props.value.province = "Madrid";
            break;
        case 'malaga':
            props.value.province = "Málaga";
            break;
        case 'murcia':
            props.value.province = "Murcia";
            break;
        case 'navarra':
            props.value.province = "Navarra";
            break;
        case 'ourense':
            props.value.province = "Orense";
            break;
        case 'palencia':
            props.value.province = "Palencia";
            break;
        case 'laspalmas':
            props.value.province = "Las Palmas";
            break;
        case 'pontevedra':
            props.value.province = "Pontevedra";
            break;
        case 'larioja':
            props.value.province = "La Rioja";
            break;
        case 'salamanca':
            props.value.province = "Salamanca";
            break;
        case 'santacruzdetenerife':
            props.value.province = "Santa Cruz de Tenerife";
            break;
        case 'segovia':
            props.value.province = "Segovia";
            break;
        case 'sevilla':
            props.value.province = "Sevilla";
            break;
        case 'soria':
            props.value.province = "Soria";
            break;
        case 'tarragona':
            props.value.province = "Tarragona";
            break;
        case 'teruel':
            props.value.province = "Teruel";
            break;
        case 'toledo':
            props.value.province = "Toledo";
            break;
        case 'valencia':
            props.value.province = "Valencia";
            break;
        case 'valladolid':
            props.value.province = "Valladolid";
            break;
        case 'zamora':
            props.value.province = "Zamora";
            break;
        case 'zaragoza':
            props.value.province = "Zaragoza";
            break;
        case 'ceuta':
            props.value.province = "Ceuta";
            break;
        case 'melilla':
            props.value.province = "Melilla";
            break;

        default:
            props.value.province = props.value.province;
    }

    if (props.value.startingDate) {
        var stringDate = props.value.startingDate.toString();
        var month = stringDate.substring(5, 7);
        var day = stringDate.substring(8, 10);
        var year = stringDate.substring(0, 4);
    }
    
    return(
        
        <div class="col s3" style={{width: 300}}>
            <div class="card grey-darken-text" style={{borderRadius: 10, fontSize: 14, fontFamily: 'Belgrano'}}>
                <div class="card-content amber lighten-2" style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10, fontWeight: "bold", overflow: "hidden", padding: 16}}>
                    <div style={{float: "left"}}><p>{props.value.name}</p></div>
                    <div style={{float: "right"}}><i className="material-icons">arrow_forward_ios</i></div>
                </div>
                <div class="card-content amber lighten-5">
                    <p>{props.value.province}</p>
                </div>
                <div class="card-content amber lighten-5" style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
                    <p>{month}/{day}/{year}</p>
                </div>
            </div>
        </div>
    );
}

export default Meeting;