import React from 'react'
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../providers/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";


export const AuthMiddleware = ( { fallbackPath, children } ) => {
  const { user, status, error, token, allAccesses } = useAuthState();
  const dispatch = useAuthDispatch();
  const { pathname } = useLocation();
	const navigate = useNavigate();


	const FRASER_BASE_URL = process.env.REACT_APP_ENV;
	const instance = axios.create({ baseURL: FRASER_BASE_URL });
	return <div>AuthMiddleware</div>;
};