BEGIN;

CREATE TABLE IF NOT EXISTS public.guild
(
    guild_id character varying(255) NOT NULL,
    channel_id character varying(255) NOT NULL,
    dateajout timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (guild_id)
);

END;
