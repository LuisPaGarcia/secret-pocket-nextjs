"use client";
import { useState } from "react";

export interface CreateSecretType {
  data:  Data;
  error: null;
}

export interface Data {
  already_open:   boolean;
  collectionId:   string;
  collectionName: string;
  content:        string;
  created:        string;
  id:             string;
  updated:        string;
  expand:         Expand;
}

export interface Expand {
}


export default function Home() {
  const [secret, setSecret] = useState<string>("");
  const [secretUrl, setSecretUrl] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch("/.netlify/functions/create_secret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret_content: secret }),
      });
      const data: CreateSecretType = await response.json()
      setSecretUrl(data.data.id)
    } catch (error) {
      console.error(error);
    }
  
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>One time secret</h1>
      <form>
        <label htmlFor="secret">
          Secret:
          <textarea
            value={secret}
            onChange={(evt) => setSecret(evt.target.value)}
            name="secret"
            className="border border-sky-500"
          />
        </label>
        <button disabled={secret === ""} onClick={handleSubmit}>
          Save Secret
        </button>
      </form>
      {secretUrl && (<a href={`/secret/${secretUrl}`} target="_blank" rel="noreferrer">Secret URL</a>)}
    </main>
  );
}
