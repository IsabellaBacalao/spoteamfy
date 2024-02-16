"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

export default function Component() {
  const [accessToken, setAccessToken] = useState('');
  const [profileImageURL, setProfileImageURL] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const token = urlParams.get("access_token");

    if (token) {
      // Stocker le jeton d'accès dans l'état local
      setAccessToken(token);
    }
  }, []);

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

  const handleLogin = () => {
    // Rediriger l'utilisateur vers la page d'autorisation Spotify
    window.location.href = getAuthorizationUrl();
  };

  const getAuthorizationUrl = () => {
    const clientId = '1cba597e55d94b3d87ee781a30363ed7';
    const redirectUri = 'http://localhost:3000/';
    const scopes = 'playlist-read-private user-read-email';

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}&response_type=token`;
  };
  
  return (
    <div className="bg-[#121212] text-white min-h-screen p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Spoteamfy</h1>
        <nav>
          {accessToken ? (
            <img
            alt="Profile picture"
            className="h-8 w-8 rounded-full"
            src={profileImageURL}
          />
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
      <main className="grid grid-cols-3 gap-8">
        <section className="space-y-6">
          <Card className="bg-[#1DB954] text-black">
            <CardHeader>
              <CardTitle>Music Maystes</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart className="w-full h-[150px]" />
              <div className="mt-4">
                <Button className="w-full" variant="default">
                  Analyze
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1DB954] text-black">
            <CardHeader>
              <CardTitle>Metankle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-bold">Who to philosophtuis</span>
                  <span className="text-sm">Enjoy by Deb</span>
                </div>
                <Button variant="default">Listen</Button>
              </div>
            </CardContent>
          </Card>
        </section>
        <section>
          <Card className="bg-black">
            <CardContent>
              <div className="flex flex-col items-center">
                <img
                  alt="Philosopher"
                  className="h-[300px] w-[300px] rounded-full"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width="300"
                />
                <div className="flex items-center mt-4">
                  <PodcastIcon className="text-[#1DB954] mr-2" />
                  <h2 className="text-2xl font-bold">Philosopher</h2>
                </div>
                <div className="flex mt-4">
                  <Button className="mr-2" variant="secondary">
                    Save to library
                  </Button>
                  <Button variant="ghost">Share</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="space-y-6">
          <Card className="bg-[#1DB954] text-black">
            <CardHeader>
              <CardTitle>Stening of Philosophteh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-bold">Save your tracks</span>
                  <span className="text-sm">Discover Something</span>
                </div>
                <Button variant="default">Listen</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1DB954] text-black">
            <CardHeader>
              <CardTitle>Philosofito</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-bold">Merlay steter</span>
                  <span className="text-sm">Start Your Philos's Hits...</span>
                </div>
                <Button variant="default">Listen</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  )
}


function PodcastIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="11" r="1" />
      <path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5Z" />
      <path d="M8 14a5 5 0 1 1 8 0" />
      <path d="M17 18.5a9 9 0 1 0-10 0" />
    </svg>
  )
}
