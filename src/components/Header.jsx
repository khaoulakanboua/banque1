
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import logo from "../assets/bank-logo.png"
import { utilisateurService } from '../service/utilisateur.service';

export default function Header() {
    const navigate = useNavigate();

    const logout = () => {
        utilisateurService.logout();
        navigate('/');
      };

    const items = [
        {
            label: 'Logout',
            command: () => { logout()}
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
        {
            label: 'Profile',
            command: () => { navigate('/app/Profile') }
        },
        
    ];

    const itemEmploye = [
        {
            label: 'Logout',
            command: () => { logout()}
        },
        {
            label: 'Client',
            command: () => { navigate('/app/client') }
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
        {
            label: 'Profile',
            command: () => { navigate('/app/Profile') }
        },
        
    ];

    const itemuser =[
        {
            label: 'Logout',
            command: () => { logout()}
        }, {
            label: 'Profile',
            command: () => { navigate('/app/Profile') }
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
            {utilisateurService.isLogged && utilisateurService.getRole() === 'ADMIN' && (
                <Menubar end={end} style={style} model={items} />
            )}
            {utilisateurService.isLogged && utilisateurService.getRole() === 'EMPLOYEE' &&(
                <Menubar end={end} style={style} model={itemEmploye} />
            )}
             {utilisateurService.isLogged && utilisateurService.getRole() === 'USER' && (
                <Menubar end={end} style={style} model={itemuser} />
            )}
            </div>
        </div>
    );

}
