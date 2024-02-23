"use client"
import React, { useState, useEffect, use } from 'react';
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import Data from './data';
import { PieChart } from 'react-minimal-pie-chart';

export default function Component() {
  const [accessToken, setAccessToken] = useState('');
  const [profileImageURL, setProfileImageURL] = useState();
  const [animalClusterId, setAnimalClusterId] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const token = urlParams.get("access_token");

    if (token) {
      // Stocker le jeton d'accès dans l'état local
      setAccessToken(token);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = getAuthorizationUrl();
  };

  const handleLogout = () => {
    setAccessToken('');
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const token = urlParams.get("access_token");

    const fetchData = async () => {
      try {
        if (!token) {
          console.error('Access token not available.');
          return;
        }

        const response = await axios.get('http://localhost:8000/cluster-graph', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data && typeof response.data.animal_cluster === 'number') {
          const animalClusterValue = response.data.animal_cluster;

          setAnimalClusterId(animalClusterValue);
        } else {
          console.error('Réponse inattendue de la route /cluster-graph:', response.data);
        }
      } catch (error : any) {
        console.error('Error fetching cluster graph data:', error.response || error.message || error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  const getAuthorizationUrl = () => {
    const clientId = '5d4637c1e36b4b88b2d8c53990a215f7';
    const redirectUri = 'http://localhost:3000/';
    const scopes = 'playlist-read-private user-read-email user-library-read';
    const grantType = 'client_credentials';

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&grant_type=${grantType}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}&response_type=token`;
  };


  useEffect(() => {
    const getSpotifyUserProfile = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userProfile = response.data;
        const imageURL = userProfile.images && userProfile.images.length > 0
          ? userProfile.images[0].url
          : 'AUCUNE_IMAGE';

        setProfileImageURL(imageURL);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil Spotify:', error);
      }
    };

    if (accessToken) {
      getSpotifyUserProfile();
    }
  }, [accessToken]);


  return (
    <div className="bg-[#121212] text-white min-h-screen p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Spoteamfy</h1>
        <nav>
          {accessToken ? (
            <div className="flex justify-between items-center">
              <img
                alt="Profile picture"
                className="h-8 w-8 mr-4 rounded-full"
                src={profileImageURL}
              />
              <Button className="ml-4" variant="ghost" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          ) : (
            <>
              <Button className="mr-4" variant="ghost" onClick={handleLogin}>
                Sign In
              </Button>
              <Button variant="secondary">Sign Up</Button>
            </>
          )}
        </nav>
      </header>
      <main className="grid grid-cols-2 gap-8">
        <section className="space-y-6">
          <Card className="bg-[#1DB954] text-black">
            <CardHeader>
              <CardTitle>Top artistes</CardTitle>
              <span className="text-sm">Survolez le diagramme avec votre souris pour voir vos artistes préférés </span>
            </CardHeader>
            <CardContent>
              <CustomBarChart className="w-full h-[150px]" />
            </CardContent>
          </Card>
          <Card className="bg-[#1DB954] text-black">
            <CardHeader>
              <CardTitle>Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <Data id={animalClusterId} />
              )}
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="space-y-6">          
        <Card className="bg-black" style={{ paddingTop: '1.5rem' }}>
            <CardContent>
              <div className="flex flex-col ">
                <img
                    alt="Cluster picture "
                    className="h-80 w-84"
                    src={"https://cdn.discordapp.com/attachments/1202912121357340683/1210489763719811082/Capture_decran_2024-02-23_a_08.13.30.png?ex=65eabf71&is=65d84a71&hm=486d572c6c0a96625c00fb4d039e5110e57de82fd382bd3cd8ede61ec0d6c5c5&"}
                  />
                <div className="flex items-center mt-4">
                  <h2 className="text-2xl font-bold bg-white">Cluster</h2>
                className="h-8 w-8 mr-4 rounded-full"
                </div>
              </div>
            </CardContent>
          </Card>
  
          <Card className="bg-[#1DB954] text-black">
            <CardHeader>
              <CardTitle>Mes genres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="flex flex-col">
                  <CustomPieChart className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}


function CustomBarChart(props: any) {
    const [chartData, setChartData] = useState([]);
    const [waiting, setWaiting] = useState(true);
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const token = urlParams.get("access_token");
  
      const fetchData = async () => {
        try {
          if (!token) {
            console.error('Access token not available.');
            return;
          }
      
          const response = await axios.get('http://localhost:8000/top-artists/20', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
      
          // Utilisation directe des données de l'API (pas besoin de la remise en forme ici)
          setChartData(response.data);
        } catch (error : any) {
          console.error('Error fetching chart data:', error.response || error.message || error);
        }finally {
          setWaiting(false);
        }
      };
  
      fetchData();
    }, []); 

    if (waiting) {
      return <div>Loading...</div>;
    }
  
    return (
      <div {...props}>
        <ResponsiveBar
          data={chartData}
          keys={["count"]}
          indexBy="name"
          colors={["#000000"]}
          enableLabel={false}
        />
      </div>
    );
  }

  function CustomPieChart(props: any) {
    const [chartPieData, setChartPieData] = useState([]);
    const [waiting, setWaiting] = useState(true);
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const token = urlParams.get("access_token");
  
      function getGrayColor(i: number) {
        const baseColor = 200;
        const step = Math.floor(baseColor / 19);
        const grayValue = baseColor - (i * step);
        const color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
        return color;
      }

      const fetchData = async () => {
        try {
          if (!token) {
            console.error('Access token not available.');
            return;
          }
      
          const response = await axios.get('http://localhost:8000/top-genres', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
      
          setChartPieData(response.data.map((dataEntry: any, index: number) => ({
            ...dataEntry,
            color: getGrayColor(index),
          })));
        } catch (error : any) {
          console.error('Error fetching chart data:', error.response || error.message || error);
        }finally {
          setWaiting(false);
        }
      };
  
      fetchData();
    }, []); 

    if (waiting) {
      return <div>Loading...</div>;
    }
  
    return (
      <div {...props}>
        <PieChart
          data={chartPieData}
          labelStyle={{
            fontSize: '5px',
            fontFamily: 'sans-serif',
          }}
          label={({ dataEntry }) => dataEntry.title}

          
        />
      </div>
    );
  }