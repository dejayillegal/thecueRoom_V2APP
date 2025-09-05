CREATE VIEW post_scores AS
SELECT
  p.id AS post_id,
  ln(1 + COALESCE(r.cnt, 0)) * 0.6 +
  ln(1 + COALESCE(c.cnt, 0)) * 0.4 +
  1 / (1 + EXTRACT(EPOCH FROM (NOW() - p.created_at)) / 3600) AS score
FROM posts p
LEFT JOIN (
  SELECT post_id, COUNT(*) AS cnt FROM reactions GROUP BY post_id
) r ON r.post_id = p.id
LEFT JOIN (
  SELECT post_id, COUNT(*) AS cnt FROM comments GROUP BY post_id
) c ON c.post_id = p.id;
