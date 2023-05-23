
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import logo from "../assets/bank-logo.png"

export default function Header() {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            command: () => { navigate('/') }
        },
        {
            label: 'Agence',
            command: () => { navigate('/app/agence') }
        },
        {
            label: 'Employe',
            command: () => { navigate('/app/employe') }
        },
        {
            label: 'Client',
            command: () => { navigate('/app/client') }
        },
        {
            label: 'Ville',
            command: () => { navigate('/app/ville') }
        },
        {
            label: 'Compte',
            command: () => { navigate('/app/compte') }
        },
        {
            label: 'Banque',
            command: () => { navigate('/app/banque') }
        },
        {

            label: 'banques',
            icon: 'pi pi-fw pi-plus',
            items: [
                {
                    label: 'By Num',
                    command: () => { navigate('/app/banque') }
                },
                {
                    label: 'By cin',
                    command: () => { navigate('/app/banque1') }
                },

            ]

        },
        {
            label: 'Operation',
            command: () => { navigate('/app/operation') }
        },

    ];
    const style = {
        backgroundColor: 'rgba(245,243,246,0.88)',
        color: '#230202',
        borderRadius: "20px",
        justifyContent: 'left'
    };


    const end = (
        <img
            alt="logo"
            src={logo}
            width="50px"
            className="mr-2"
        />
    );



    return (
        <div>
            <div className="card">
                <Menubar end={end} style={style} model={items} />

            </div>
        </div>
    );

}
