import React, { useState , useEffect } from "react";

function ExampleSelect() {

    type DiccionarioDeArreglos = {
        [llave: string]: string[]
    };

    const [data, setData] = useState<DiccionarioDeArreglos>({});
    const [auto, setAuto] = useState<string>("");
    const [marca, setMarca] = useState<string>("");

    const changeInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAuto(e.target.value);
        setMarca("");
    }

    useEffect(() => {
        async function fetchData() {
            const data: DiccionarioDeArreglos = {
                "Toyota": ["Camry HEV.", "Corolla HEV.", "RAV4 HEV.", "Raize.", "Corolla Cross."],
                "Ford": ["Ford Focus", "Ford Fiesta.", "Ford Kuga.", "Ford Mondeo.", "Ford Mustang."],
                "Honda": ["Accord", "Civic", "CR-V.", "HR-V.", "NSX."],
                "JEEP": ["Grand Cherokee", "Grand Cherokee 4xe.", "Wrangler 4xe", "Wrangler.", "Cherokee."],
            };
            
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Example Select</h1>
            <select onChange={changeInput} >
                <option value="">Seleccione una Marca</option>
                {
                    Object.keys(data).map((key) => {
                        return (
                            <option value={key}>La marca es:{key}</option>
                        )
                    })
                }
            </select>
            <select onChange={(e) => setMarca(e.target.value)} >
                <option value="">Seleccione un Modelo</option>
                {
                    data[auto] && data[auto].map((marca) => {
                        return (
                            <option value={marca}>{marca}</option>
                        )
                    })
                }
            </select>
            <span>{auto}</span>
            <span>{marca}</span>
        </div>
    )
}

export default ExampleSelect;