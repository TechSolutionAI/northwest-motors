"use client"

import { useState, useEffect } from "react"

export function GoogleMap() {

  useEffect(() => {
  }, [])

  return (
    <div className="h-full w-full">
      {/* Google Map iframe with the provided URL that includes a marker */}
      <iframe
        className="w-full h-full"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAbMq2GbvKt0koOmW7IqzJntqghocwlGw8&q=Northwest+Motors+Inc,2459 S IL Route 83,Mundelein+IL+60060"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map showing Northwest Motors Inc location"
      ></iframe>
    </div>
  )
}
