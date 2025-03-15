function extractFeatures(url) {
    const parsedURL = new URL(url);
    const domain = parsedURL.hostname;
    const path = parsedURL.pathname;
  
    const features = {
      having_IP_Address: /^(\d{1,3}\.){3}\d{1,3}$/.test(domain) ? 1 : 0,
      URL_Length: url.length > 54 ? 1 : (url.length > 20 ? 0 : -1),
      Shortining_Service: /bit\.ly|tinyurl|goo\.gl/.test(url) ? 1 : -1,
      having_At_Symbol: url.includes('@') ? 1 : -1,
      double_slash_redirecting: path.includes('//') ? 1 : -1,
      Prefix_Suffix: domain.includes('-') ? 1 : -1,
      having_Sub_Domain: (domain.split('.').length - 2) > 0 ? 1 : -1,
      SSLfinal_State: parsedURL.protocol === 'https:' ? 1 : -1,
      HTTPS_token: domain.includes('https') ? 1 : -1,
      Redirect: (url.match(/\/\//g) || []).length > 1 ? 1 : 0,
      on_mouseover: 0,
      RightClick: 0,
      Iframe: 0,
      Domain_Age: -1,
      Domain_End: -1,
      Web_Traffic: -1,
      Google_Index: 1,
      Page_Rank: -1,
      Links_Pointing: 0,
      Statistical_Report: 0,
      URL_of_Anchor: 0,
      SFH: 0,
      Submitting_to_Email: 0,
      Abnormal_URL: 0,
      DNS_Record: 1,
      Favicon: 1,
      Port: [80, 443, null].includes(parsedURL.port) ? 1 : -1,
      HTTPS_in_URL: url.toLowerCase().includes('https') ? 1 : -1,
      Request_URL: 0,
      Anchor_URL: 0
    };
  
    return Object.values(features);
  }