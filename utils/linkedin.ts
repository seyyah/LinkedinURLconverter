/**
 * Parses a LinkedIn URL to extract the URN and generate an embed URL.
 * Supports:
 * 1. Standard Feed Updates: https://www.linkedin.com/feed/update/urn:li:activity:123...
 * 2. Share Links: https://www.linkedin.com/feed/update/urn:li:share:123...
 * 3. UGC Posts: https://www.linkedin.com/feed/update/urn:li:ugcPost:123...
 * 4. Public Post Slugs: https://www.linkedin.com/posts/username_activity-123...
 */
export const generateEmbedData = (url: string) => {
  try {
    const cleanUrl = url.trim();
    if (!cleanUrl) return { error: "Please enter a URL." };

    // Basic URL validation
    new URL(cleanUrl);

    let urn = '';

    // Strategy 1: Look for explicit URN pattern (urn:li:...)
    // Matches urn:li:activity:..., urn:li:share:..., urn:li:ugcPost:...
    const urnMatch = cleanUrl.match(/(urn:li:(activity|ugcPost|share):[0-9]+)/);

    if (urnMatch) {
      urn = urnMatch[1];
    } else {
      // Strategy 2: Look for activity ID in "vanity" post URLs
      // e.g. .../posts/user_activity-123456789...
      const activityMatch = cleanUrl.match(/activity-([0-9]+)/);
      if (activityMatch) {
        urn = `urn:li:activity:${activityMatch[1]}`;
      }
    }

    if (!urn) {
      return { error: "Could not find a valid post ID or URN in this URL." };
    }

    const embedUrl = `https://www.linkedin.com/embed/feed/update/${urn}`;
    
    // Standard iframe code provided by LinkedIn documentation
    const iframeCode = `<iframe src="${embedUrl}" height="800" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`;

    return {
      embedUrl,
      iframeCode,
      error: null
    };

  } catch (e) {
    return { error: "Invalid URL format." };
  }
};