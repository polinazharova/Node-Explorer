SELECT g.id as 'group_id', g.caption as 'group_name', 
n.id as 'node_id', n.caption as 'node_name', s.id as 'node_status_id', 
s.description as 'node_status_name', s.color as 'node_status_color', app.id as 'app_id', app.caption as 'app_name',
i.id as 'interface_id', i.caption as 'interface_name', s2.id as 'interface_status_id', s2.description as 'interface_status_name', 
s2.color as 'interface_status_color', 
u.id as 'admin_id', u.firstname as 'admin_firstname', u.lastname as 'admin_lastname', u.email as 'admin_email'
FROM groups g JOIN groups_nodes gn on g.id = gn.group_id 
JOIN nodes n ON gn.node_id = n.id JOIN statuses s ON n.status = s.id
JOIN interfaces i ON i.id = n.interface JOIN statuses s2
ON i.status = s2.id JOIN users u ON u.id = n.admin 
JOIN nodes_applications na ON n.id = na.node_id JOIN applications app ON app.id = na.application_id